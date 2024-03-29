import { Component, forceUpdate, h, Prop, State } from "@stencil/core";
import { RouterHistory } from "@stencil/router";
import "@midwest-design/core";
import "@stencil/router";
import Authentication from "../../models/Authentication";
import User from "../../models/User";
import Conference from "../../models/Conference";
import Tunnel from "../../tunnels/authentication";

const components = "app-header, app-footer, barcamp-app, barcamp-profile";

@Component({
  tag: "barcamp-app",
})
export class BarcampApp {
  @Prop() history: RouterHistory;

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

  Route = ({ component, ...props }: { [key: string]: any }) => {
    const Component = component;

    return (
      <stencil-route
        {...props}
        routeRender={(props: { [key: string]: any }) => {
          this.updateClass(Component);

          return <Component {...props} {...props.componentProps} />;
        }}
      />
    );
  };

  PrivateRoute = ({ component, ...props }: { [key: string]: any }) => {
    const Component = component;

    return (
      <stencil-route
        {...props}
        routeRender={(props: { [key: string]: any }) => {
          this.updateClass(Component);

          if (this.user) {
            return <Component {...props} {...props.componentProps} />;
          }

          return <stencil-router-redirect url={this.getRedirectURL()} />;
        }}
      />
    );
  };

  PrivateEventManagerRoute = ({
    component,
    ...props
  }: {
    [key: string]: any;
  }) => {
    const Component = component;

    return (
      <stencil-route
        {...props}
        routeRender={(props: { [key: string]: any }) => {
          this.updateClass(Component);

          if (
            this.user &&
            this.conference &&
            this.conference.isManagedBy(this.user)
          ) {
            return <Component {...props} {...props.componentProps} />;
          }

          return <stencil-router-redirect url={this.getRedirectURL()} />;
        }}
      />
    );
  };

  render() {
    const userState = {
      user: this.user,
    };

    return (
      <Tunnel.Provider state={userState}>
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
              <stencil-router>
                <stencil-route-switch scrollTopOffset={0}>
                  <this.Route url="/docs/:name" component="barcamp-docs" />
                  <this.Route url="/auth" component="barcamp-auth" />
                  <this.Route url="/sign-out" component="barcamp-sign-out" />

                  <this.PrivateRoute
                    url="/dashboard"
                    component="barcamp-dashboard"
                  />

                  <this.PrivateRoute
                    url="/profile"
                    component="barcamp-profile"
                  />
                  <this.PrivateRoute
                    url="/host/:conferenceId/:tabId"
                    component="barcamp-host"
                  />
                  <this.PrivateRoute
                    url="/host/:conferenceId"
                    component="barcamp-host"
                  />
                  <this.PrivateRoute url="/host" component="barcamp-host" />

                  <this.PrivateRoute
                    url="/:slug/:year/schedule/reassign"
                    component="barcamp-schedule-reassign-talk"
                  />

                  <this.PrivateRoute
                    url="/:slug/:year/schedule/switch"
                    component="barcamp-schedule-switch-talk"
                  />
                  <this.PrivateRoute
                    url="/:slug/:year/schedule/release"
                    component="barcamp-schedule-release"
                  />
                  <this.PrivateRoute
                    url="/:slug/schedule/switch"
                    component="barcamp-schedule-switch-talk"
                  />
                  <this.PrivateRoute
                    url="/:slug/schedule/reassign"
                    component="barcamp-schedule-reassign-talk"
                  />
                  <this.PrivateRoute
                    url="/:slug/schedule/release"
                    component="barcamp-schedule-release"
                  />
                  <this.Route
                    url="/:slug/:year/schedule"
                    component="barcamp-schedule"
                  />
                  <this.Route
                    url="/:slug/schedule"
                    component="barcamp-schedule"
                  />
                  <this.Route
                    url="/:slug/:year"
                    component="barcamp-default-marketing"
                  />
                  <this.Route
                    url="/:slug"
                    component="barcamp-default-marketing"
                  />

                  <this.Route url="/" component="barcamp-home" />
                </stencil-route-switch>
              </stencil-router>
            </article>
            <app-footer />
            <web-audio>
              <web-audio-source name="alert" src="/assets/audio/alert.mp3" />
              <web-audio-source name="chime" src="/assets/audio/chime.mp3" />
              <web-audio-source name="cancel" src="/assets/audio/cancel.mp3" />
            </web-audio>
          </main>
        </midwest-theme>
      </Tunnel.Provider>
    );
  }
}
