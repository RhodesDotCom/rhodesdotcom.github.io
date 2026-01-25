export const contact = `
    <div class="row mt-3 mb-1 text-center text-muted">
        <span>Contact Information</span>
    </div>
    <div class="row">
        <p class="mb-0" style="font-size: 0.75em;">leave your email below to recieve any potential updates</p>
    </div>
    <div class="row justify-content-center">
        <div class="col-sm-8">
            <input type="text" class="form-control" id="email" autocomplete="off" placeholder="Email...">
        </div>
    </div>
`;

export const dietary = `
    <div class="row mt-3 mb-1 text-center text-muted">
        <span>Dietary Requirements</span>
    </div>
    <div class="row justify-content-center">
        <!-- VEGETARIAN -->
        <div class="col-md-3 col-12 form-check form-check-inline text-nowrap">
            <input class="form-check-input float-none" type="checkbox" id="vegetarian" value="1">
            <label class="form-check-label" for="vegetarian">Vegetarian</label>
        </div>
        <!-- VEGAN -->
        <div class="col-md-3 col-12 form-check form-check-inline text-nowrap">
            <input class="form-check-input float-none" type="checkbox" id="vegan" value="1">
            <label class="form-check-label" for="vegan">Vegan</label>
        </div>
        <!-- NUT ALLERGY -->
        <div class="col-md-3 col-12 form-check form-check-inline text-nowrap">
            <input class="form-check-input float-none" type="checkbox" id="nut" value="1">
            <label class="form-check-label" for="nut">Nut Allergy</label>
        </div>
        <!-- GLUTEN FREE -->
        <div class="col-md-3 col-12 form-check form-check-inline text-nowrap">
            <input class="form-check-input float-none" type="checkbox" id="gluten" value="1">
            <label class="form-check-label" for="gluten">Gluten Free</label>
        </div>
        <!-- DAIRY FREE -->
        <div class="col-md-3 col-12 form-check form-check-inline text-nowrap">
            <input class="form-check-input float-none" type="checkbox" id="dairy" value="1">
            <label class="form-check-label" for="dairy">Dairy Free</label>
        </div>
    </div>
    <div class="row mt-1">
        <p class="mb-0" style="font-size: 0.75em;">please leave any other dietary requirements below</p>
    </div>
`;

export const evening = `
    <div class="row">
        <div class="col-6 text-end">
            <span>Evening</span>
        </div>
        <div class="col-6 text-start">
            <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" id="evening-yes" value="1" required>
            <label class="form-check-label" for="evening-yes">Yes</label>
            </div>
            <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" id="evening-no" value="0" required>
            <label class="form-check-label" for="evening-no">No</label>
            </div>
        </div>
    </div>
`;

export const name_card = `
    <div class="row mt-5">
        <div class="col-md d-flex justify-content-center">
            <div id="{{id}}" class="card attendee">
                <div class="card-body">
                    <h5 class="card-title"></h5>
                    <div class="container">
                        <div class="row mt-3 mb-1 text-center text-muted">
                            <span>Confirm Attendance</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

export const reception = `
    <div class="row">
        <div class="col-6 text-end">
            <span>Ceremony & Reception</span>
        </div>
        <div class="col-6 text-start">
            <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" id="reception-yes" value="1" required>
            <label class="form-check-label" for="reception-yes">Yes</label>
            </div>
            <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" id="reception-no" value="0" required>
            <label class="form-check-label" for="reception-no">No</label>
            </div>
        </div>
    </div>
`;

