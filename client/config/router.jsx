import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'


import TopicList from '../views/topic_list/index'
import TopicDetail from '../views/topic_detail/index'
import TestApi from '../views/test/api_test'


export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact key="first" />,
  <Route path="/detail" component={TopicDetail} key="list" />,
  <Route path="/list" component={TopicList} key="detail" />,
  <Route path="/test" component={TestApi} key="test" />,
]
