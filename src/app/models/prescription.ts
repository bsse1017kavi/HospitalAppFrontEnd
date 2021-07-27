import { Patient } from "./patient";
import { Medicine } from "./medicine";

export class Prescription
{
    //public doctorName : String;
    public patient : Patient;
    public medicines : Medicine[] = [];
}