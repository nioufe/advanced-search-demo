import React, { Component } from "react";

import logo from "./logo.svg";
import "./App.css";

import logs from "./samplelogs.json";
import parser from "./search-syntax";

import basicSearch from "./basicSearch";
import { toggleValue, print } from "./searchEditor";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logsMatches: logs,
      query: "",
      syntaxTree: []
    };
  }

  onSearch = e => {
    if (e.key !== "Enter") {
      return;
    }
    const syntaxTree = parser.parse(e.target.value);
    this.setState({
      logsMatches: basicSearch(logs, syntaxTree),
      syntaxTree
    });
  };

  onValueSelect(key, value) {
    const { syntaxTree } = this.state;
    const newTree = toggleValue(syntaxTree, key, value);
    const newSearch = print(newTree);
    // to be certain the tree is exactly matching the search
    const validNewTree = parser.parse(newSearch);
    this.setState({
      logsMatches: basicSearch(logs, validNewTree),
      syntaxTree: validNewTree,
      query: newSearch
    });
  }

  setQuery = e => {
    this.setState({
      query: e.target.value
    });
  };

  renderFacets() {
    const { syntaxTree } = this.state;
    let statusAttribute, sourceAttribute;
    (syntaxTree || []).forEach(attribute => {
      if (attribute.key === "status") {
        statusAttribute = attribute;
      } else if (attribute.key === "source") {
        sourceAttribute = attribute;
      }
    });
    return (
      <div className="col-2">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Status</h5>
            {["error", "warn", "info"].map(status => (
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={status}
                  name="status"
                  value={status}
                  checked={
                    statusAttribute && statusAttribute.values.includes(status)
                  }
                  onChange={e => {
                    this.onValueSelect("status", status);
                  }}
                />
                <label className="form-check-label" htmlFor={status}>
                  {status}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Source</h5>
            {["apache", "nginx", "postgres", "cassandra"].map(source => (
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={source}
                  name="source"
                  value={source}
                  checked={
                    sourceAttribute && sourceAttribute.values.includes(source)
                  }
                  onChange={e => {
                    this.onValueSelect("source", source);
                  }}
                />
                <label className="form-check-label" htmlFor={source}>
                  {source}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="search-app">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="form-group">
                <div className="input-group">
                  <input
                    onKeyPress={this.onSearch}
                    onChange={this.setQuery}
                    value={this.state.query}
                    type="text"
                    className="form-control form-control-lg"
                    id="searchInput"
                    aria-describedby="searchHelp"
                    placeholder="Search your logs..."
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {this.renderFacets()}
            <div className="col-10 search-app__logs">
              {this.state.logsMatches.map(log => (
                <div className="row">
                  <div className="col-1">
                    <pre>
                      <code>{log.status}</code>
                    </pre>
                  </div>
                  <div className="col-2">
                    <pre>
                      <code>{log.source}</code>
                    </pre>
                  </div>
                  <div className="col-9">
                    <pre>
                      <code>{log.message}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
