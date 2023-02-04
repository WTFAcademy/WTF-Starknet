import request from '@site/src/api/request';

export const getLessons = (courseId: string, uid: string) => {
    return request.get(`/courses/${courseId}/lessons?network=stark_net&login_uid=${uid}`).then(res => res.data);
}

export const getLesson = (courseId: string, lessonId: string, uid: string) => {
    return request.get(`/courses/${courseId}/user_lessons/${lessonId}?network=stark_net&login_uid=${uid}`).then(res => res.data);
}

export const getCourseInfo = (courseId: string, uid: string) => {
    return request.get(`/course/${courseId}?network=stark_net&login_uid=${uid}`).then(res => res.data);
}

export const getUserCourseInfo = (courseId: string, uid: string) => {
    return request
      .get(`/user_course/${courseId}?network=stark_net&login_uid=${uid}`)
      .then((res) => res.data);
}

export const getNftSign = (courseId: string, uid: string) => {
    return request
      .get(
        `/user_course/${courseId}/nft_sign?network=stark_net&login_uid=${uid}`
      )
      .then((res) => res.data);
}
