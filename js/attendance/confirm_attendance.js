import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../db/config.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

$(async () => { 
    const id = sessionStorage.getItem("attendeeId");
    const name = sessionStorage.getItem("attendeeName");

    if (!id || !name) {
        // error handling
    }

    let attendee = await getAttendee(id, name);

    if (!attendee.length) {
        // error handling
        // window.location.href = "/attendance/";
    }

    let grouped_ids = await getGroup(id);
    if (grouped_ids.length > 1) {
        for (let {attendee_id} of grouped_ids) {
            if ( attendee_id != id ) {
                let name_card = await getNameCard(attendee_id)
                $('#rsvp').prepend(name_card)
            }
        }
    }

    let name_card = await getNameCard(id)
    $('#rsvp').prepend(name_card)

    let message = await getAttendee(id);
    if (message[0].message && message[0].message.length) {
        $('#message').val( message[0].message );
    }

    $("#rsvp").on("submit", async function(e) {
        e.preventDefault();

        let isValid = true;

        // Clear previous state
        $(this).find('.is-invalid').removeClass('is-invalid');

        // Text, textarea, select
        $(this).find('[required]').each(function () {
            const $field = $(this);

            // Radio handled separately
            if ($field.is(':radio')) return;

            if (!$field.val()) {
                $field.addClass('is-invalid');
                isValid = false;
            }
        });

        // Radio groups
        $(this).find('input[type="radio"][required]').each(function () {
            const name = this.name;

            if (!$(`input[name="${name}"]:checked`).length) {
                $(`input[name="${name}"]`).addClass('is-invalid');
                isValid = false;
            }
        });

        if (!isValid) {
            return;
        }
        
        // const formData = $(this).serialize();
        const formData = new FormData(this);
        var attendee_responses = {};

        for (let [name, response] of formData.entries()) {
            let [event, attendee_id] = name.split('_');
            attendee_responses[attendee_id] = attendee_responses[attendee_id] || {};
            attendee_responses[attendee_id][event] = response;
        }

        let message = $('#message').val();

        for (let [attendee_id, responses] of Object.entries(attendee_responses)) {
            const update_values = {
                "reception_confirmed": responses.reception ?? 0,
                "evening_confirmed": responses.evening ?? 0,
                "vegan": responses.vegan ?? 0,
                "vegetarian": responses.vegetarian ?? 0,
                "nut": responses.nut ?? 0,
                "dairy": responses.dairy ?? 0,
                "gluten": responses.gluten ?? 0,
                "email": responses.contact ?? "",
                "message": message
            };

            const { data, error } = await supabase
                .from('attendees')
                .update(update_values)
                .eq('id', attendee_id)
                .select()

            // created stored procedure so that updates can be rolled back

        }


        window.location.href = "/attendance/confirmed/";
            
    });        
    

})

async function getAttendee(id, name = "") {
    let [forename, surname] = ["", ""];
  
    if (name) {
      [forename, surname] = name.split(" ");
    }

    let query = supabase
      .from("attendees")
      .select("*")
      .eq("id", id);

    if (forename) query = query.eq("forename", forename);
    if (surname) query = query.eq("surname", surname);
  
    let { data: attendee, error } = await query;
  
    if (error) console.error(id, error);
  
    return attendee;
}

async function getGroup(id) {

    let { data: groups, error: groupsError } = await supabase
        .from('group')
        .select('group_id')
        .eq('attendee_id', id);

    if (groupsError) {console.log(groupsError)}

    let groupIds = groups.map(g => g.group_id);

    let { data: attendees, error: usersError } = await supabase
        .from('group')
        .select('attendee_id')
        .in('group_id', groupIds);


    return attendees
        
}

async function getNameCard(id) {

    const attendee = await getAttendee(id);

    let template = await $.get('/attendance/confirm_attendance/name_card.html');
    let $template = $(template);

    $template.find('.card-title').html( attendee[0].forename + " " + attendee[0].surname )

    if ( attendee[0].reception_invite ) {
        let reception_template = await $.get('/attendance/confirm_attendance/reception.html');
        let $reception_template = $(reception_template);

        $reception_template.find('.form-check-input').each( function() {
            $(this).attr('name', 'reception_' + attendee[0].id);
            $(this).attr('id', $(this).attr('id') + '_' + attendee[0].id);
        });
        $reception_template.find('.form-check-label').each( function() {
            $(this).attr('id', $(this).attr('id') + '_' + attendee[0].id);
        });
        if (attendee[0].reception_confirmed === true) {
            $reception_template.find('#reception-yes' + '_' + attendee[0].id).attr('checked', true);
        }
        if (attendee[0].reception_confirmed === false) {
            $reception_template.find('#reception-no' + '_' + attendee[0].id).attr('checked', true);
        }

        $template.find('.container').append($reception_template);
    }

    if ( attendee[0].evening_invite ) {
        let evening_template = await $.get('/attendance/confirm_attendance/evening.html');
        let $evening_template = $(evening_template);
        
        $evening_template.find('.form-check-input').each( function() {
            $(this).attr('name', 'evening_' + attendee[0].id);
            $(this).attr('id', $(this).attr('id') + '_' + attendee[0].id);
        });
        $evening_template.find('.form-check-label').each( function() {
            $(this).attr('id', $(this).attr('id') + '_' + attendee[0].id);
        });
        if (attendee[0].evening_confirmed === true) {
            $evening_template.find('#evening-yes' + '_' + attendee[0].id).attr('checked', true);
        }
        if (attendee[0].evening_confirmed === false) {
            $evening_template.find('#evening-no' + '_' + attendee[0].id).attr('checked', true);
        }

        $template.find('.container').append($evening_template);
    }

    if ( attendee[0].reception_invite || attendee[0].evening_invite ) {
        let dietary_template = await $.get('/attendance/confirm_attendance/dietary.html');
        let $dietary_template = $(dietary_template);

        $dietary_template.find('.form-check-input').each( function() {
            let name = $(this).attr('id');
            $(this).attr('name', name + '_' + attendee[0].id);
        });
        if (attendee[0].vegan === true) {
            $dietary_template.find('#vegan').attr('checked', true);
        }
        if (attendee[0].vegetarian === true) {
            $dietary_template.find('#vegetarian').attr('checked', true);
        }
        if (attendee[0].nut === true) {
            $dietary_template.find('#nut').attr('checked', true);
        }
        if (attendee[0].dairy === true) {
            $dietary_template.find('#dairy').attr('checked', true);
        }
        if (attendee[0].gluten === true) {
            $dietary_template.find('#gluten').attr('checked', true);
        }

        $template.find('.container').append($dietary_template);

        let contact_template = await $.get('/attendance/confirm_attendance/contact.html');
        let $contact_template = $(contact_template);

        $contact_template.find('.form-control').each( function() {
            let name = $(this).attr('id');
            $(this).attr('name', 'email_' + attendee[0].id);
            $(this).attr('id', $(this).attr('id') + '_' + attendee[0].id);
        });
        if (attendee[0].email !== null) {
            $contact_template.find('#email' + '_' + attendee[0].id).val(attendee[0].email);
        }

        $template.find('.container').append($contact_template);
        
    }



    // todo : add id to for
    // todo : fix email autofill

    return $template
}
