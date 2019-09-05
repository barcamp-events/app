import { Component, h, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import '@stellar-design/core';
import '@stencil/router';
import Authentication from '../../models/Authentication';
import User from '../../models/User';
import Event from '../../models/Event';
import Tunnel from '../../tunnels/authentication'

@Component({
  tag: 'barcamp-app'
})
export class BarcampApp {
  @Prop() history: RouterHistory;

  @State() auth = new Authentication;
  @State() user: User;
  @State() event: Event;

  componentWillLoad() {
    Authentication.onAuthStateChanged(({user}) => {
      this.user = user;
    })
  }

  getRedirectURL() {
    const relativeLink = `${window.location.pathname}${window.location.search}`
    return `/auth?redirect=${encodeURI(relativeLink)}`
  }

  updateClass(component) {
    if (component) {
      document.querySelector('html').setAttribute('route', component)
    }
  }

  Route = ({ component, ...props}: { [key: string]: any}) => {
    const Component = component;

    return (
      <stencil-route {...props} routeRender={
        (props: { [key: string]: any}) => {
          this.updateClass(Component);

          return <Component {...props} {...props.componentProps} />;
        }
      }/>
    );
  }

  PrivateRoute = ({ component, ...props}: { [key: string]: any}) => {
    const Component = component;

    return (
      <stencil-route {...props} routeRender={
        (props: { [key: string]: any}) => {
          this.updateClass(Component);

          if (this.user) {
            return <Component {...props} {...props.componentProps} />;
          }

          return <stencil-router-redirect url={this.getRedirectURL()} />
        }
      }/>
    );
  }

  PrivateEventManagerRoute = ({ component, ...props}: { [key: string]: any}) => {
    const Component = component;

    return (
      <stencil-route {...props} routeRender={
        (props: { [key: string]: any}) => {
          this.updateClass(Component);

          if (this.user && this.event && this.event.isManagedBy(this.user)) {
            return <Component {...props} {...props.componentProps} />;
          }

          return <stencil-router-redirect url={this.getRedirectURL()} />
        }
      }/>
    );
  }

  render() {
    const userState = {
      user: this.user
    };

    return (
        <Tunnel.Provider state={userState}>
          <stellar-theme body system />
          <main>
            <app-header />
            <article>
              <stencil-router>
                <stencil-route-switch scrollTopOffset={0}>
                  <this.Route url='/docs/:name' component='barcamp-docs' />
                  <this.Route url='/auth' component='barcamp-auth' />
                  <this.Route url='/sign-out' component='barcamp-sign-out' />

                  <this.PrivateRoute url='/host' component='barcamp-host-name-your-event' />
                  <this.PrivateEventManagerRoute url='/host/:eventId/budget' component='barcamp-host-set-budget' />
                  <this.PrivateEventManagerRoute url='/host/:eventId/venue' component='barcamp-host-find-venue' />
                  <this.PrivateEventManagerRoute url='/host/:eventId/agenda' component='barcamp-host-set-agenda' />
                  <this.PrivateEventManagerRoute url='/host/:eventId/sponsors' component='barcamp-host-find-sponsors' />
                  <this.PrivateEventManagerRoute url='/host/:eventId/volunteers' component='barcamp-host-volunteers' />
                  <this.PrivateEventManagerRoute url='/host/:eventId/format' component='barcamp-host-set-format' />
                  <this.PrivateEventManagerRoute url='/host/:eventId/branding' component='barcamp-host-branding' />

                  <this.Route url='/:eventSlug' component='barcamp-default-marketing' />
                  <this.Route url='/:eventSlug/:eventYear' component='barcamp-default-marketing' />
                  <this.PrivateRoute url='/:eventSlug/schedule' component='barcamp-schedule' />
                  <this.PrivateRoute url='/:eventSlug/:eventYear/schedule' component='barcamp-schedule' />

                  <this.PrivateRoute url='/dashboard' component='barcamp-dashboard' />
                  <this.Route url='/' component='barcamp-home' />
                </stencil-route-switch>
              </stencil-router>
            </article>
            <app-footer />
          </main>
        </Tunnel.Provider>
    );
  }
}
