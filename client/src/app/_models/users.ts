export class Users {
    _id: String;
    info:
    {
        first_name: String;
        last_name: String;
        full_name: String;
        gender: String;
        dob: Date;
        employment_sitution: String;
        areas_expertise: String;
    };
    address_residence:
    {
        address: String,
        latitude: String,
        longitude: String,
        city: { type: String },
        district: { type: String },
        ward: { type: String }
    };
    contact:
    {
        email: String;
        phone: String;
        web_page: String;
    };
    password: String;
    image: String;
    create_at: Date;
    last_update: Date;
    constructor() { };
}
