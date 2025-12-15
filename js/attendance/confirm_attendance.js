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

    if (grouped_ids.length) {
        for (let {attendee_id} of grouped_ids) {
            let name_card = await getNameCard(attendee_id)
            $('#rsvp').prepend(name_card)
        }
    } else {
        let name_card = await getNameCard(id)
        $('#rsvp').prepend(name_card)
    }

    $("#rsvp").on("submit", async function(e) {
        e.preventDefault();
        
        // const formData = $(this).serialize();
        const formData = new FormData(this);
        var attendee_responses = {};

        for (let [name, response] of formData.entries()) {
            let [event, attendee_id] = name.split('-');
            attendee_responses[attendee_id] = attendee_responses[attendee_id] || {};
            attendee_responses[attendee_id][event] = response;
        }

        for (let [attendee_id, responses] of Object.entries(attendee_responses)) {

            const update_values = {
                "reception_confirmed": responses.reception ?? 0,
                "ceremony_confirmed": responses.evening ?? 0
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
      .select("id,forename,surname")
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

    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => attendee[0][key] || "");

}
