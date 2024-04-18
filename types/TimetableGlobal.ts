/** The ID string for a timetable global variable */
export declare type TimetableGlobalId = string

export interface TimetableGlobal {
    id: TimetableGlobalId
    name: string
    settings: {draft_options: {}}
    customfields: []
    reg_name: string
    tt_datefrom: string
}