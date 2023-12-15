const classDaos = require("../daos/klass");
const userDaos = require("../daos/user");
const generateRandomString = require("../utils/randomString");
const scheduleService = require("./schedule");

const addClassService = async (data) => {
  const { startTime, endTime, numOfWeek } = data;
  const duration = [];
  for (let i = 0; i < numOfWeek; i++) {
    const _startTime = new Date(
      new Date(startTime).getTime() + 7 * 24 * 60 * 60 * 1000 * i
    );
    const _endTime = new Date(
      new Date(endTime).getTime() + 7 * 24 * 60 * 60 * 1000 * i
    );
    duration.push([_startTime, _endTime]);
  }
  const code = generateRandomString(6);
  const dataClass = { ...data, duration, code };
  const newClass = await classDaos.addClass(dataClass);
  return newClass;
};

const enrollClassByCodeService = async (code, userId) => {
  const klass = await classDaos.findClass({ code });
  if (klass) {
    const user = await userDaos.findUser({ _id: userId });
    if (user && !klass.studentId.includes(user?._id)) {
      // update class
      klass.studentId.push(userId);
      await klass.save();
      // update schedule
      const schedule = await scheduleService.checkScheduleService(userId);
      if (schedule) {
        schedule.klass.push(klass?._id);
        await schedule.save();
      } else {
        await scheduleService.addScheduleService({
          userId,
          klass: [klass?._id],
        });
      }
      return {
        msg: "Enroll class successfully",
      };
    } else {
      return {
        errMsg: "User not found or have been enrolled class before",
      };
    }
  }

  return {
    errMsg: "Class not found",
  };
};

const updateClassService = async (data) => {
  const { classId, ...otherField } = data;
  const klass = await classDaos.findClass({ _id: classId });
  if (klass) {
    const updatedClass = await classDaos.updateClass(
      { _id: classId },
      otherField
    );

    return updatedClass;
  }

  return {
    errMsg: "Class not found",
  };
};

const deleteClassService = async (id) => {
  const klass = await classDaos.findClass({ _id: id });
  if (klass) {
    await classDaos.deleteClass(id);
    return {
      msg: "Delete class successfully",
    };
  }
  return {
    errMsg: "Class not found",
  };
};

const getStudentClassService = async (studentId) => {
  const student = await userDaos.findUser({ _id: studentId });
  if (student) {
    const listClass = await classDaos.getListClassOfStudent(studentId);
    return listClass;
  }

  return {
    errMsg: "Student not found",
  };
};

const getTeacherClassService = async (teacherId) => {
  const teacher = await userDaos.findUser({ _id: teacherId });
  if (teacher) {
    const listClass = await classDaos.getListClassOfTeacher(teacherId);
    return listClass;
  }

  return {
    errMsg: "Teacher not found",
  };
};

const getDetailClassService = async (id) => {
  const klass = await classDaos.findClass({ _id: id });
  if (klass) {
    const klass = await classDaos.getDetailClass(id);
    return klass;
  }

  return {
    errMsg: "Class not found",
  };
};

module.exports = {
  addClassService,
  updateClassService,
  deleteClassService,
  getStudentClassService,
  getTeacherClassService,
  getDetailClassService,
  enrollClassByCodeService,
};
