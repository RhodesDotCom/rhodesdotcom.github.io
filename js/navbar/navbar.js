$(document).ready(() => {

    $('#nav-placeholder').html(`
        <nav class="navbar navbar-expand-sm navbar-light p-2">
            <a class="navbar-brand" href="/homepage">HOME</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbar">
                <div class="navbar-nav">
                    <a class="nav-item nav-link" href="/attendance">RSVP</a>
                </div>
                <div class="navbar-nav">
                    <a class="nav-item nav-link" href="/timeline">Timeline</a>
                </div>
                <div class="navbar-nav">
                    <a class="nav-item nav-link" href="/locations">Locations</a>
                </div>
                <div class="navbar-nav">
                    <a class="nav-item nav-link" href="/information">Information</a>
                </div>
            </div>
            <button id="beeButton">
                <img style="height:3vh;width:auto;transform:scale(-1,1);" src="/images/bee.png">
            </button>
            <img id="bee" style="height:3vh;width:auto; display:none;" src="/images/bee.png">
        </nav>
    `);

});
