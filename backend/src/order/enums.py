import enum


class Series(enum.Enum):
    S1 = '104'
    S2 = '104 улучшенная'
    S3 = '105'
    S4 = '106'
    S5 = 'Сталинка'
    S6 = 'Индивидуальный проект'


class Status(enum.Enum):
    NEW = 'new'
    APPROVED = "approved"
    DENIED = "denied"
    MEASURE_TIME = "measure_time"
    MEASURE_ATTACHED = "measure_attached"
    DESIGN_TIME = "design_time"
    DESIGN_ATTACHED = "design_attached"
    DESIGN_APPROVED = "design_approved"
    DESIGN_DENIED = "design_denied"
    PREWORK_ATTACHED = 'prework_attached'
    PREWORK_APPROVED = 'prework_approved'
    PREWORK_DENIED = 'prework_denied'
    CONTRACT_ATTACHED = 'contract_attached'
    CONTRACT_SIGNED = 'contract_signed'
    CHECK_ATTACHED = 'check_attached'
    CHECK_APPROVED = 'check_approved'
    CHECK_DECLINED = 'check_declined'
    FINISH_DOC_ATTACHED = 'finish_doc_attached'
    STAGE_REPORT_ATTACHED = 'stage_report_attached'


class RepairTypeEnum(enum.Enum):
    CAPITAL = "Капитальный"
    COSMETIC = "Косметический"
