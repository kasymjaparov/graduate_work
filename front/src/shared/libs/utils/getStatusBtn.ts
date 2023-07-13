interface IStatusBtnOption {
    [property: string]: {
        text: string
        color: string
    }
}
/**Данные по статусам */
export const getStatusBtn = (status: string) => {
    const statuses: IStatusBtnOption = {
        new: {
            text: "В обработке",
            color: "#7afff0",
        },
        approved: {
            text: "Ответственные назначены",
            color: "#4932d2",
        },
        denied: {
            text: "Отказано",
            color: "#f50057",
        },
        measure_time: {
            text: "Время замера установлено",
            color: "#74ffea",
        },
        measure_attached: {
            text: "Замер закреплен",
            color: "#ff8c63"
        },
        design_time: {
            text: "Дата готовности дизайна установлена",
            color: "#1e88e5"
        },
        design_approved: {
            text: "Дизайн утвержден",
            color: "#d6ff63"
        },
        design_denied: {
            text: "Дизайн отклонен",
            color: "#f50057"
        },
        prework_attached: {
            text: "Акт с прейскурантом закреплен",
            color: "#64daf0",
        },
        prework_approved: {
            text: "Акт с прейскурантом одобрен",
            color: "#da64ff",
        },
        prework_denied: {
            text: "Акт с прейскурантом отклонен",
            color: "#ff6388",
        },
        design_attached: {
            text: "Дизайн прикреплен",
            color: "#b1f5f9",
        },
        contract_attached: {
            text: "Договор прикреплен",
            color: "#d6ff63",
        },
        check_attached: {
            text: "Чек прикреплен",
            color: "#ff8c63",
        },
        check_declined: {
            text: "Чек отклонен",
            color: "#f50057"
        },
        check_approved: {
            text: "Чек утвержден",
            color: "#00cc9b"
        },
        finish_doc_attached: {
            text: "Акт о работах прикреплен",
            color: "#b1f5f9"
        },
        stage_report_attached: {
            text: "Отчет по ремонту прикреплен",
            color: "#ff8c63"
        },
    }
    return statuses[status as keyof typeof statuses]
}
