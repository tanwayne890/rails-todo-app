import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Tags from "../components/Tags"
import Tag from "../components/Tag"
import NewTag from "../components/NewTag"
import NewTask from "../components/NewTask"

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/tags" exact component={Tags} />
      <Route path="/tag/:id" exact component={Tag} />
      <Route path="/new_tag" exact component={NewTag} />
      <Route path="/new_task/:tag_id" exact component={NewTask} />
    </Switch>
  </Router>
);