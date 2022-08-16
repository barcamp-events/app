import { Component, h, State, forceUpdate } from "@stencil/core";
import "@midwest-design/core";
import { createRouter, Route, match } from "stencil-router-v2";
import Authentication from "../../models/Authentication";
import User from "../../models/User";
import Conference from "../../models/Conference";

const Router = createRouter();

const components = "app-header, app-footer, barcamp-app, barcamp-profile";

@Component({
  tag: "barcamp-app",
})
export class BarcampApp {
  @State() auth: Authentication = window["Authentication"] as Authentication;
  @State() user: User;
  @State() conference: Conference;

  componentWillLoad() {
    Authentication.onAuthStateChanged(({ user }) => {
      this.user = user;

      if (this.user) {
        this.user.onChange(() => {
          document.querySelectorAll(components).forEach((component: any) => {
            forceUpdate(component);
          });
        });
      }
    });

    Router.onChange("url", (_newValue, _oldValue) => {
      // Access fields such as pathname, search, etc. from newValue
      // This would be a good place to send a Google Analytics event, for example
    });
  }

  getRedirectURL() {
    const relativeLink = `${window.location.pathname}${window.location.search}`;
    return `/auth?redirect=${encodeURI(relativeLink)}`;
  }

  updateClass(component) {
    if (component) {
      document.querySelector("html").setAttribute("route", component);
    }
  }

  PrivateRoute = (path, render) => {
    return [
      <Route
        path={path}
        render={() => {
          if (this.user) {
            return render();
          }
        }}
      />,
      <Route path={path} to={this.getRedirectURL()} />,
    ];
  };

  PrivateEventManagerRoute = (path, render) => {
    return [
      <Route
        path={path}
        render={() => {
          if (
            this.user &&
            this.conference &&
            this.conference.isManagedBy(this.user)
          ) {
            return render();
          }
        }}
      />,
      <Route path={path} to={this.getRedirectURL()} />,
    ];
  };

  render() {
    return (
      <midwest-theme
        body
        system
        base={(this.user && this.user.color) || "violet"}
        complement={(this.user && this.user.color) || "violet"}
        dark={this.user && this.user.dark_mode}
      >
        <main>
          <app-header />
          <article>
            <Router.Switch>
              <Route
                path={match("/docs/:name")}
                render={({ name }) => <barcamp-docs name={name} />}
              />
              <Route path="/auth" render={<barcamp-auth />} />
              <Route path="/sign-out" render={<barcamp-sign-out />} />
              <Route
                path={match("/:slug/:year/schedule")}
                render={({ slug, year }) => (
                  <barcamp-schedule slug={slug} year={year} />
                )}
              />
              <Route
                path={match("/:slug/:year")}
                render={({ slug, year }) => (
                  <barcamp-default-marketing slug={slug} year={year} />
                )}
              />
              <Route
                path={match("/:slug")}
                render={<barcamp-default-marketing />}
              />
              <Route path="/" render={<barcamp-home />} />

              <Route path="/dashboard" render={() => <barcamp-dashboard />} />

              <this.PrivateRoute
                path="/dashboard"
                render={() => <barcamp-dashboard />}
              />

              <this.PrivateRoute
                path="/profile"
                render={() => <barcamp-profile />}
              />

              <this.PrivateRoute
                path={match("/host/:conferenceId/:tabId")}
                render={({ conferenceId, tabId }) => (
                  <barcamp-host conference-id={conferenceId} tab-id={tabId} />
                )}
              />

              <this.PrivateRoute
                path={match("/host/:conferenceId")}
                render={({ conferenceId }) => (
                  <barcamp-host conference-id={conferenceId} />
                )}
              />

              <this.PrivateRoute path="/host" render={() => <barcamp-host />} />

              <this.PrivateRoute
                path={match("/:slug/:year/schedule/switch")}
                render={({ slug, year }) => (
                  <barcamp-schedule-switch-talk slug={slug} year={year} />
                )}
              />

              <this.PrivateRoute
                path={match("/:slug/schedule/switch")}
                render={({ slug }) => (
                  <barcamp-schedule-switch-talk slug={slug} />
                )}
              />
            </Router.Switch>
          </article>
          <app-footer />
          <web-audio>
            <web-audio-source name="alert" src="/assets/audio/alert.mp3" />
            <web-audio-source name="chime" src="/assets/audio/chime.mp3" />
            <web-audio-source name="cancel" src="/assets/audio/cancel.mp3" />
          </web-audio>
        </main>
      </midwest-theme>
    );
  }
}
