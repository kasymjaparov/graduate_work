import { IProfile } from "../Auth/type"

export interface Order {
    id: number,
    address: string,
    doc_text: string
    series: string,
    room_amount: number,
    square: string,
    type?: string,
    status: string,
    contract?: string,
    contract_signed: boolean,
    created_at: string,
    updated_at: string,
    reason_of_deny?: string
    repair_type?: "Капитальный" | "Косметический"
    act: {
        id: number,
        contract: string,
        client?: string,
        pm?: string,
        builder?: string,
        created_at: string,
        updated_at: string
    },
    design: [{
        cancel_reason?: string
        deadline_date: string
        description?: string
        file: any
        id: number
        is_approved?: boolean
        order_id: number
        sample_image?: { id: number; image: string }[]
    }]
    client: IProfile,
    manager: IProfile,
    designer: IProfile,
    meauser: IProfile,
    measurement: IMeauserment[],
    builders: IProfile[],
    pre_work_doc: PreWork[]
    order_room:
    {
        id: number,
        name: string,
        description: string
        square: string
        order_image: {
            id: number
            image: string
        }[]
    }[],
    order_check: Check[],
    samples: [],
    stage: Stage[]
    finish_doc: { id: number, file: string, created_at: string }[]
}
export interface Stage {
    id: number
    title: string
    description: string
    order_id: number
    created_at: string
    stage_image: { id: number, image: string }[]
}
export interface Check {
    id?: number,
    image: string,
    order_id: number,
    is_approved: boolean | null
}
export interface IHandleOrderReq {
    id: string;
    reason_of_deny: string;
}
export interface DeclineDesign {
    design_id: number;
    cancel_reason: string;
}
export interface AcceptOrder {
    repair_type: "Капитальный" | "Косметический"
    order_id: number
    meauser_id: number
    designer_id: number
    builder_id: number[]
}
export interface AddMeauser {
    comment: string
    file: any
}
export interface IMeauserment {
    id: number
    come_date: string
    comment?: string
    file?: string
    created_at: string
}
export interface ListFilter {
    page: string
    status: string
}
export interface Design {
    description: string
    sample_image: SampleImage[]
    file: any
    deadline_date?: string
}

export interface SampleImage {
    image: any
    description: string
}
export interface PreWork {
    id?: number,
    doc_file: string,
    order_id: number,
    created_at?: string,
    updated_at?: string
}
export interface Comment {
    id: number,
    text: string,
    created_at: string,
    user: {
        id: number,
        type: string,
        email: string
    }
}
export interface CreateStage {
    title: string,
    description: string,
    stage_image:
    {
        image: string
    }[]
}