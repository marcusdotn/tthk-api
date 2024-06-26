import type { TimetableBellId, TimetableBell } from "../Bell"
import type { TimetableBreakId, TimetableBreak } from "../Break"
import type { TimetableBuildingId, TimetableBuilding } from "../Building"
import type { TimetableCardId, TimetableCard } from "../Card"
import type { TimetableClassId, TimetableClass } from "../Class"
import type { TimetableClassroomId, TimetableClassroom } from "../Classroom"
import type { TimetableClassroomSupervisionId, TimetableClassroomSupervision } from "../ClassroomSupervision"
import type { TimetableDayId, TimetableDay } from "../Day"
import type { TimetableDivisionId, TimetableDivision } from "../Division"
import type { TimetableGlobalId, TimetableGlobal } from "../Global"
import type { TimetableGroupId, TimetableGroup } from "../Group"
import type { TimetableLessonId, TimetableLesson } from "../Lesson"
import type { TimetablePeriodId, TimetablePeriod } from "../Period"
import type { TimetableStudentId, TimetableStudent } from "../Student"
import type { TimetableStudentSubjectId, TimetableStudentSubject } from "../StudentSubject"
import type { TimetableSubjectId, TimetableSubject } from "../Subject"
import type { TimetableTeacherId, TimetableTeacher } from "../Teacher"
import type { TimetableTermId, TimetableTerm } from "../Term"
import type { TimetableWeekId, TimetableWeek } from "../Week"
import type { TimetableDayDefinitionId, TimetableDayDefinition } from "../DayDefinition"
import type { TimetableTermDefinitionId, TimetableTermDefinition } from "../TermDefinition"
import type { TimetableWeekDefinitionId, TimetableWeekDefinition } from "../WeekDefinition"
import type { ApiTimetable } from "./ApiConfigDataJson"


const timetableDtoDateRegex = /(\d{2}\. \d{2}\.) - (\d{2}\. \d{2}\.) (\d{4})/;


/**
    The interface for a timetable data store
    - This defines the structure for the container in which all
    timetable data entries are stored.
*/
export class TimetableDataStore {
    constructor(timetableEntry: ApiTimetable) {
        Object.assign(this, timetableEntry);
    }

    globals: Record<TimetableGlobalId, TimetableGlobal> = {};
    periods: Record<TimetablePeriodId, TimetablePeriod> = {};
    breaks: Record<TimetableBreakId, TimetableBreak> = {};
    bells: Record<TimetableBellId, TimetableBell> = {};
    daysdefs: Record<TimetableDayDefinitionId, TimetableDayDefinition> = {};
    weeksdefs: Record<TimetableWeekDefinitionId, TimetableWeekDefinition> = {};
    termsdefs: Record<TimetableTermDefinitionId, TimetableTermDefinition> = {};
    days: Record<TimetableDayId, TimetableDay> = {};
    weeks: Record<TimetableWeekId, TimetableWeek> = {};
    terms: Record<TimetableTermId, TimetableTerm> = {};
    buildings: Record<TimetableBuildingId, TimetableBuilding> = {};
    classrooms: Record<TimetableClassroomId, TimetableClassroom> = {};
    classes: Record<TimetableClassId, TimetableClass> = {};
    subjects: Record<TimetableSubjectId, TimetableSubject> = {};
    teachers: Record<TimetableTeacherId, TimetableTeacher> = {};
    groups: Record<TimetableGroupId, TimetableGroup> = {};
    divisions: Record<TimetableDivisionId, TimetableDivision> = {};
    students: Record<TimetableStudentId, TimetableStudent> = {};
    lessons: Record<TimetableLessonId, TimetableLesson> = {};
    studentsubjects: Record<TimetableStudentSubjectId, TimetableStudentSubject> = {};
    cards: Record<TimetableCardId, TimetableCard> = {};
    classroomsupervisions: Record<TimetableClassroomSupervisionId, TimetableClassroomSupervision> = {};

    dto: ApiTimetable = {} as ApiTimetable
    get date_span() {
        var startDate: Date | undefined;
        var endDate: Date | undefined;

        try {
            const match: string[] = this.dto.text.match(timetableDtoDateRegex) as string[];
            const span = match[0].replaceAll(" ", "").trim();
            const spanSplit = span.split("-");
    
            const startSplit = spanSplit[0].split(".");
            const endSplit = spanSplit[1].split('.');
            const year = endSplit[2];
    
    
            startDate = new Date(`${startSplit[1]}.${startSplit[0]}.${year}`);
            endDate = new Date(`${endSplit[1]}.${endSplit[0]}.${year}`);
        } catch(_) {}

        if (!startDate || !endDate) {
            // we'll assume we can't parse the date from the timetable's name
            // let's try and guess it ourselves using the datastore's datefrom(start date)
            const weekLength = Number(process.env?.TTHK_WEEK_LENGTH) || 5

            startDate = new Date(this.dto.datefrom);
            endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + weekLength);
        }

        return [startDate, endDate];
    }
}

export type DataStoreType<TableName extends keyof TimetableDataStore> = 
  TimetableDataStore[TableName] extends Record<string, infer V> ? V : never;
