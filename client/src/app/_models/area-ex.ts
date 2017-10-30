import { AreaExpertiseDetail } from "./area-ex-detail";
export class AreaExpertise {
    result: Number;
    msg: string;
    data: {
        name: String;
        description: String;
        areas_ex_details: [AreaExpertiseDetail]
    };
    last_update: Date;
    constructor() { }
}