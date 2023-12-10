const classDaos = require("../daos/klass");
const userDaos = require("../daos/user");

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
  const dataClass = { ...data, duration };
  const newClass = await classDaos.addClass(dataClass);
  return newClass;
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

const getStudentClassService = async (studentEmail) => {
  const student = await userDaos.findUser({ email: studentEmail });
  if (student) {
    const listClass = await classDaos.getListClassOfStudent(studentEmail);
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
};
