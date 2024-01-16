import { AssociateModel } from "../Model/associate.model";



export const AssociateState:AssociateModel={
    list:[],
    errormessage:'',
    associateobj:{
        id: 0,
        name: "",
        email: "",
        phone: "8139886630",
        type: "CUSTOMER",
        address: "",
        associategroup: "level1",
        status: false
    }
}