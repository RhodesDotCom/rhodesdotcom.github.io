import { supabase } from "../db/config.js";
import { animateButton  } from '../button/button.js';

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

  animateButton();

}

function getAttendeeCard(id, name) {
  return `
    <div id="${id}" class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <button type="button" class="button-confirm btn btn-green btn-flower">
          Confirm Attendance
          <img class="flower f1" src="/images/flower_1.png">
          <img class="flower f2" src="/images/flower_2.png">
          <img class="flower f3" src="/images/flower_3.png">
          <img class="flower f4" src="/images/flower_4.png">
          <img class="flower f5" src="/images/flower_5.png">
          <img class="flower f6" src="/images/flower_6.png">
          <img class="flower f7" src="/images/flower_7.png">
          <img class="flower f8" src="/images/flower_8.png">
          <img class="flower f9" src="/images/flower_1.png">
          <img class="flower f10" src="/images/flower_2.png">
          <img class="flower f11" src="/images/flower_3.png">
          <img class="flower f12" src="/images/flower_4.png">
          <img class="flower f13" src="/images/flower_5.png">
          <img class="flower f14" src="/images/flower_6.png">
          <img class="flower f15" src="/images/flower_7.png">
          <img class="flower f16" src="/images/flower_8.png">
          <img class="flower f17" src="/images/flower_1.png">
          <img class="flower f18" src="/images/flower_2.png">
          <img class="flower f19" src="/images/flower_3.png">
          <img class="flower f20" src="/images/flower_4.png">
          <img class="flower f21" src="/images/flower_5.png">
          <img class="flower f22" src="/images/flower_6.png">
        </a>
      </div>
    </div>
  `;
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
  fetchAttendees();
});