import Mock from 'mockjs'

import aside from './aside'

Mock.mock(`/api${process.env.VUE_APP_pathname}/getAside`, 'get', aside)
