import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../db/config.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
let attendeeNames = [];

async function fetchAttendees() {
  const { data, error } = await supabase
    .from("attendees")
    .select("id, forename, surname");

  if (error) {
    console.error("Supabase error:", error);
    return;
  }
  attendeeNames = data.map(row => ({
    id: row.id,
    name: `${row.forename} ${row.surname}`
  }));
}

function filterAttendees(query) {
  const $list = $('#attendeeList');

  const matches = attendeeNames.filter(item =>
    query.length >= 1 && item.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  const matchSet = new Set(matches.map(m => m.name));

  // remove non-matches
  $list.children().each(function() {
    const $item = $(this);
    const name = $item.data('name');

    if (!matchSet.has(name)) {
      anime({
        targets: $item[0],
        opacity: [1, 0],
        height: [ $item.outerHeight(), 0 ],
        marginTop: [ parseInt($item.css("margin-top")), 0 ],
        marginBottom: [ parseInt($item.css("margin-bottom")), 0 ],
        duration: 250,
        easing: 'easeInOutQuad',
        complete: () => $item.remove()
      });
    }
  });

  // Add new matches
  matches.forEach(({ id, name }) => {

    if ($list.children(`[data-name="${name}"]`).length > 0) return;
  
    const $new = $(getAttendeeCard(id, name))
      .attr('data-name', name)
      .css({
        opacity: 0,
        height: 0,
        marginTop: 0,
        marginBottom: 0
      });
  
    // insert alphabetically
    let inserted = false;
    $list.children().each(function() {
      const existingName = $(this).data('name');
      if (name.localeCompare(existingName) < 0) {
        $new.insertBefore(this);
        inserted = true;
        return false;
      }
    });
  
    if (!inserted) {
      $list.append($new);
    }
  
    anime({
      targets: $new[0],
      opacity: [0, 1],
      height: [$new.get(0).scrollHeight, $new.get(0).scrollHeight],
      marginTop: [0, ''],
      marginBottom: [0, ''],
      duration: 250,
      easing: 'easeInOutQuad'
    });
  });
}

function getAttendeeCard(id, name) {
        // <img class="card-img-top" src="/images/wine_glasses.png" width="200px" height="200px" alt="Card image cap">
  return `
    <div id="${id}" class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <a class="button-confirm btn btn-light">Confirm Attendance</a>
      </div>
    </div>
  `;

  // <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
}

$('#attendeeInput').on('input', function () {
  filterAttendees(this.value);
});

$("#attendeeList").on('click', '.button-confirm', function() {
  const id = $(this).closest('.card').attr('id');
  const name = $(this).closest('.card').find('.card-title').text();
  sessionStorage.setItem("attendeeId", id);
  sessionStorage.setItem("attendeeName", name);
  window.location.href = "/attendance/confirm_attendance/";

});

$(document).ready(() => {
  $('#nav-placeholder').load('/navigation/navbar.html')
  fetchAttendees();

});