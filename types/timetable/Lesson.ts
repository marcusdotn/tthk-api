import { timetableService } from "../../serviceProvider";
import type { TimetableClassId } from "./Class";
import type { TimetableGroupId } from "./Group";
import type { TimetableStudentId } from "./Student";
import type { TimetableSubjectId } from "./Subject";
import type { TimetableTeacherId } from "./Teacher";
import type { TimetableDayDefinitionId } from "./definitions/DayDefinition";
import type { TimetableTermDefinitionId } from "./definitions/TermDefinition";
import type { TimetableWeekDefinitionId } from "./definitions/WeekDefinition";

/** The ID string for a timetable lesson */
export declare type TimetableLessonId = string

/**
    The class for a timetable lesson
*/
export class TimetableLesson {
    id: TimetableLessonId = "";
    count: number = 0;
    durationperiods: number = 0;
    terms: string = "";
    seminargroup: any | null = null;
    texts: any | null = null;
    groupnames: string[] = [];
    classdata: {} = {};
    
    
    termsdefid: TimetableTermDefinitionId = "";
    get term() {
        return timetableService.data.termsdefs[this.termsdefid];
    }

    weeksdefid: TimetableWeekDefinitionId = "";
    get weekdef() {
        return timetableService.data.weeksdefs[this.weeksdefid];
    }

    daysdefid: TimetableDayDefinitionId = "";
    get daysdef() {
        return timetableService.data.daysdefs[this.daysdefid];
    }

    subjectid: TimetableSubjectId = "";
    get subject() {
        return timetableService.data.subjects[this.subjectid];
    }

    teacherids: TimetableTeacherId[] = [];
    get teachers() {
        const teachers = [];

        for (const teacherId of this.teacherids) {
            const teacher = timetableService.data.teachers[teacherId];

            teachers.push(teacher);
        }

        return teachers;
    }

    groupids: TimetableGroupId[] = [];
    get groups() {
        const groups = [];

        for (const groupId of this.groupids) {
            const group = timetableService.data.groups[groupId];

            groups.push(group);
        }

        return groups;
    }

    classids: TimetableClassId[] = [];
    get classes() {
        const classes = [];

        for (const classId of this.classids) {
            const classObj = timetableService.data.classes[classId];

            classes.push(classObj);
        }

        return classes;
    }

    studentids: TimetableStudentId[] = [];
    get students() {
        const students = [];

        for (const studentId of this.studentids) {
            const student = timetableService.data.students[studentId];

            students.push(student);
        }

        return students;
    }
}