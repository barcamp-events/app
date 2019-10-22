/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  MatchResults,
  RouterHistory,
} from '@stencil/router';

export namespace Components {
  interface AppFooter {}
  interface AppHeader {
    'user': User;
  }
  interface BarcampApp {
    'history': RouterHistory;
  }
  interface BarcampAuth {
    'history': RouterHistory;
  }
  interface BarcampDashboard {}
  interface BarcampDefaultMarketing {
    'history': RouterHistory;
    'match': MatchResults;
  }
  interface BarcampDocs {
    'history': RouterHistory;
    'match': MatchResults;
  }
  interface BarcampEventCard {
    'conference': Conference;
    'get_conf': () => Promise<Conference>;
    'get_user': () => Promise<import("/Users/williammriley/Sites/BarCamp/app/src/models/User").default>;
    'user': User;
  }
  interface BarcampForgotPassword {}
  interface BarcampHome {}
  interface BarcampHostBranding {}
  interface BarcampHostFindSponsors {}
  interface BarcampHostFindVenue {}
  interface BarcampHostGatherVolunteers {}
  interface BarcampHostNameYourEvent {}
  interface BarcampHostSetAgenda {}
  interface BarcampHostSetBudget {}
  interface BarcampHostSetFormat {}
  interface BarcampProfile {}
  interface BarcampSchedule {
    'getConference': () => Promise<Conference>;
    'history': RouterHistory;
    'match': MatchResults;
  }
  interface BarcampScheduleSignup {}
  interface BarcampScheduleTalk {
    'talk': Talk;
    'user': User;
  }
  interface BarcampScheduleTalkAvailable {
    'talk': Talk;
    'user': User;
  }
  interface BarcampScheduleTalkSignedUp {
    'speaker': User;
    'talk': Talk;
    'user': User;
  }
  interface BarcampScheduleTalkSigningUp {
    'signingUp': User;
    'talk': Talk;
    'user': User;
  }
  interface BarcampScheduleTrack {
    'track': Track;
  }
  interface BarcampSignOut {
    'history': RouterHistory;
  }
  interface BarcampSponsor {
    'sponsor': Sponsor;
  }
}

declare global {

  // Adding a global JSX for backcompatibility with legacy dependencies
  export namespace JSX {
    export interface Element {}
  }


  interface HTMLAppFooterElement extends Components.AppFooter, HTMLStencilElement {}
  var HTMLAppFooterElement: {
    prototype: HTMLAppFooterElement;
    new (): HTMLAppFooterElement;
  };

  interface HTMLAppHeaderElement extends Components.AppHeader, HTMLStencilElement {}
  var HTMLAppHeaderElement: {
    prototype: HTMLAppHeaderElement;
    new (): HTMLAppHeaderElement;
  };

  interface HTMLBarcampAppElement extends Components.BarcampApp, HTMLStencilElement {}
  var HTMLBarcampAppElement: {
    prototype: HTMLBarcampAppElement;
    new (): HTMLBarcampAppElement;
  };

  interface HTMLBarcampAuthElement extends Components.BarcampAuth, HTMLStencilElement {}
  var HTMLBarcampAuthElement: {
    prototype: HTMLBarcampAuthElement;
    new (): HTMLBarcampAuthElement;
  };

  interface HTMLBarcampDashboardElement extends Components.BarcampDashboard, HTMLStencilElement {}
  var HTMLBarcampDashboardElement: {
    prototype: HTMLBarcampDashboardElement;
    new (): HTMLBarcampDashboardElement;
  };

  interface HTMLBarcampDefaultMarketingElement extends Components.BarcampDefaultMarketing, HTMLStencilElement {}
  var HTMLBarcampDefaultMarketingElement: {
    prototype: HTMLBarcampDefaultMarketingElement;
    new (): HTMLBarcampDefaultMarketingElement;
  };

  interface HTMLBarcampDocsElement extends Components.BarcampDocs, HTMLStencilElement {}
  var HTMLBarcampDocsElement: {
    prototype: HTMLBarcampDocsElement;
    new (): HTMLBarcampDocsElement;
  };

  interface HTMLBarcampEventCardElement extends Components.BarcampEventCard, HTMLStencilElement {}
  var HTMLBarcampEventCardElement: {
    prototype: HTMLBarcampEventCardElement;
    new (): HTMLBarcampEventCardElement;
  };

  interface HTMLBarcampForgotPasswordElement extends Components.BarcampForgotPassword, HTMLStencilElement {}
  var HTMLBarcampForgotPasswordElement: {
    prototype: HTMLBarcampForgotPasswordElement;
    new (): HTMLBarcampForgotPasswordElement;
  };

  interface HTMLBarcampHomeElement extends Components.BarcampHome, HTMLStencilElement {}
  var HTMLBarcampHomeElement: {
    prototype: HTMLBarcampHomeElement;
    new (): HTMLBarcampHomeElement;
  };

  interface HTMLBarcampHostBrandingElement extends Components.BarcampHostBranding, HTMLStencilElement {}
  var HTMLBarcampHostBrandingElement: {
    prototype: HTMLBarcampHostBrandingElement;
    new (): HTMLBarcampHostBrandingElement;
  };

  interface HTMLBarcampHostFindSponsorsElement extends Components.BarcampHostFindSponsors, HTMLStencilElement {}
  var HTMLBarcampHostFindSponsorsElement: {
    prototype: HTMLBarcampHostFindSponsorsElement;
    new (): HTMLBarcampHostFindSponsorsElement;
  };

  interface HTMLBarcampHostFindVenueElement extends Components.BarcampHostFindVenue, HTMLStencilElement {}
  var HTMLBarcampHostFindVenueElement: {
    prototype: HTMLBarcampHostFindVenueElement;
    new (): HTMLBarcampHostFindVenueElement;
  };

  interface HTMLBarcampHostGatherVolunteersElement extends Components.BarcampHostGatherVolunteers, HTMLStencilElement {}
  var HTMLBarcampHostGatherVolunteersElement: {
    prototype: HTMLBarcampHostGatherVolunteersElement;
    new (): HTMLBarcampHostGatherVolunteersElement;
  };

  interface HTMLBarcampHostNameYourEventElement extends Components.BarcampHostNameYourEvent, HTMLStencilElement {}
  var HTMLBarcampHostNameYourEventElement: {
    prototype: HTMLBarcampHostNameYourEventElement;
    new (): HTMLBarcampHostNameYourEventElement;
  };

  interface HTMLBarcampHostSetAgendaElement extends Components.BarcampHostSetAgenda, HTMLStencilElement {}
  var HTMLBarcampHostSetAgendaElement: {
    prototype: HTMLBarcampHostSetAgendaElement;
    new (): HTMLBarcampHostSetAgendaElement;
  };

  interface HTMLBarcampHostSetBudgetElement extends Components.BarcampHostSetBudget, HTMLStencilElement {}
  var HTMLBarcampHostSetBudgetElement: {
    prototype: HTMLBarcampHostSetBudgetElement;
    new (): HTMLBarcampHostSetBudgetElement;
  };

  interface HTMLBarcampHostSetFormatElement extends Components.BarcampHostSetFormat, HTMLStencilElement {}
  var HTMLBarcampHostSetFormatElement: {
    prototype: HTMLBarcampHostSetFormatElement;
    new (): HTMLBarcampHostSetFormatElement;
  };

  interface HTMLBarcampProfileElement extends Components.BarcampProfile, HTMLStencilElement {}
  var HTMLBarcampProfileElement: {
    prototype: HTMLBarcampProfileElement;
    new (): HTMLBarcampProfileElement;
  };

  interface HTMLBarcampScheduleElement extends Components.BarcampSchedule, HTMLStencilElement {}
  var HTMLBarcampScheduleElement: {
    prototype: HTMLBarcampScheduleElement;
    new (): HTMLBarcampScheduleElement;
  };

  interface HTMLBarcampScheduleSignupElement extends Components.BarcampScheduleSignup, HTMLStencilElement {}
  var HTMLBarcampScheduleSignupElement: {
    prototype: HTMLBarcampScheduleSignupElement;
    new (): HTMLBarcampScheduleSignupElement;
  };

  interface HTMLBarcampScheduleTalkElement extends Components.BarcampScheduleTalk, HTMLStencilElement {}
  var HTMLBarcampScheduleTalkElement: {
    prototype: HTMLBarcampScheduleTalkElement;
    new (): HTMLBarcampScheduleTalkElement;
  };

  interface HTMLBarcampScheduleTalkAvailableElement extends Components.BarcampScheduleTalkAvailable, HTMLStencilElement {}
  var HTMLBarcampScheduleTalkAvailableElement: {
    prototype: HTMLBarcampScheduleTalkAvailableElement;
    new (): HTMLBarcampScheduleTalkAvailableElement;
  };

  interface HTMLBarcampScheduleTalkSignedUpElement extends Components.BarcampScheduleTalkSignedUp, HTMLStencilElement {}
  var HTMLBarcampScheduleTalkSignedUpElement: {
    prototype: HTMLBarcampScheduleTalkSignedUpElement;
    new (): HTMLBarcampScheduleTalkSignedUpElement;
  };

  interface HTMLBarcampScheduleTalkSigningUpElement extends Components.BarcampScheduleTalkSigningUp, HTMLStencilElement {}
  var HTMLBarcampScheduleTalkSigningUpElement: {
    prototype: HTMLBarcampScheduleTalkSigningUpElement;
    new (): HTMLBarcampScheduleTalkSigningUpElement;
  };

  interface HTMLBarcampScheduleTrackElement extends Components.BarcampScheduleTrack, HTMLStencilElement {}
  var HTMLBarcampScheduleTrackElement: {
    prototype: HTMLBarcampScheduleTrackElement;
    new (): HTMLBarcampScheduleTrackElement;
  };

  interface HTMLBarcampSignOutElement extends Components.BarcampSignOut, HTMLStencilElement {}
  var HTMLBarcampSignOutElement: {
    prototype: HTMLBarcampSignOutElement;
    new (): HTMLBarcampSignOutElement;
  };

  interface HTMLBarcampSponsorElement extends Components.BarcampSponsor, HTMLStencilElement {}
  var HTMLBarcampSponsorElement: {
    prototype: HTMLBarcampSponsorElement;
    new (): HTMLBarcampSponsorElement;
  };
  interface HTMLElementTagNameMap {
    'app-footer': HTMLAppFooterElement;
    'app-header': HTMLAppHeaderElement;
    'barcamp-app': HTMLBarcampAppElement;
    'barcamp-auth': HTMLBarcampAuthElement;
    'barcamp-dashboard': HTMLBarcampDashboardElement;
    'barcamp-default-marketing': HTMLBarcampDefaultMarketingElement;
    'barcamp-docs': HTMLBarcampDocsElement;
    'barcamp-event-card': HTMLBarcampEventCardElement;
    'barcamp-forgot-password': HTMLBarcampForgotPasswordElement;
    'barcamp-home': HTMLBarcampHomeElement;
    'barcamp-host-branding': HTMLBarcampHostBrandingElement;
    'barcamp-host-find-sponsors': HTMLBarcampHostFindSponsorsElement;
    'barcamp-host-find-venue': HTMLBarcampHostFindVenueElement;
    'barcamp-host-gather-volunteers': HTMLBarcampHostGatherVolunteersElement;
    'barcamp-host-name-your-event': HTMLBarcampHostNameYourEventElement;
    'barcamp-host-set-agenda': HTMLBarcampHostSetAgendaElement;
    'barcamp-host-set-budget': HTMLBarcampHostSetBudgetElement;
    'barcamp-host-set-format': HTMLBarcampHostSetFormatElement;
    'barcamp-profile': HTMLBarcampProfileElement;
    'barcamp-schedule': HTMLBarcampScheduleElement;
    'barcamp-schedule-signup': HTMLBarcampScheduleSignupElement;
    'barcamp-schedule-talk': HTMLBarcampScheduleTalkElement;
    'barcamp-schedule-talk-available': HTMLBarcampScheduleTalkAvailableElement;
    'barcamp-schedule-talk-signed-up': HTMLBarcampScheduleTalkSignedUpElement;
    'barcamp-schedule-talk-signing-up': HTMLBarcampScheduleTalkSigningUpElement;
    'barcamp-schedule-track': HTMLBarcampScheduleTrackElement;
    'barcamp-sign-out': HTMLBarcampSignOutElement;
    'barcamp-sponsor': HTMLBarcampSponsorElement;
  }
}

declare namespace LocalJSX {
  interface AppFooter extends JSXBase.HTMLAttributes<HTMLAppFooterElement> {}
  interface AppHeader extends JSXBase.HTMLAttributes<HTMLAppHeaderElement> {
    'user'?: User;
  }
  interface BarcampApp extends JSXBase.HTMLAttributes<HTMLBarcampAppElement> {
    'history'?: RouterHistory;
  }
  interface BarcampAuth extends JSXBase.HTMLAttributes<HTMLBarcampAuthElement> {
    'history'?: RouterHistory;
  }
  interface BarcampDashboard extends JSXBase.HTMLAttributes<HTMLBarcampDashboardElement> {}
  interface BarcampDefaultMarketing extends JSXBase.HTMLAttributes<HTMLBarcampDefaultMarketingElement> {
    'history'?: RouterHistory;
    'match'?: MatchResults;
  }
  interface BarcampDocs extends JSXBase.HTMLAttributes<HTMLBarcampDocsElement> {
    'history'?: RouterHistory;
    'match'?: MatchResults;
  }
  interface BarcampEventCard extends JSXBase.HTMLAttributes<HTMLBarcampEventCardElement> {
    'conference'?: Conference;
    'user'?: User;
  }
  interface BarcampForgotPassword extends JSXBase.HTMLAttributes<HTMLBarcampForgotPasswordElement> {}
  interface BarcampHome extends JSXBase.HTMLAttributes<HTMLBarcampHomeElement> {}
  interface BarcampHostBranding extends JSXBase.HTMLAttributes<HTMLBarcampHostBrandingElement> {}
  interface BarcampHostFindSponsors extends JSXBase.HTMLAttributes<HTMLBarcampHostFindSponsorsElement> {}
  interface BarcampHostFindVenue extends JSXBase.HTMLAttributes<HTMLBarcampHostFindVenueElement> {}
  interface BarcampHostGatherVolunteers extends JSXBase.HTMLAttributes<HTMLBarcampHostGatherVolunteersElement> {}
  interface BarcampHostNameYourEvent extends JSXBase.HTMLAttributes<HTMLBarcampHostNameYourEventElement> {}
  interface BarcampHostSetAgenda extends JSXBase.HTMLAttributes<HTMLBarcampHostSetAgendaElement> {}
  interface BarcampHostSetBudget extends JSXBase.HTMLAttributes<HTMLBarcampHostSetBudgetElement> {}
  interface BarcampHostSetFormat extends JSXBase.HTMLAttributes<HTMLBarcampHostSetFormatElement> {}
  interface BarcampProfile extends JSXBase.HTMLAttributes<HTMLBarcampProfileElement> {}
  interface BarcampSchedule extends JSXBase.HTMLAttributes<HTMLBarcampScheduleElement> {
    'history'?: RouterHistory;
    'match'?: MatchResults;
  }
  interface BarcampScheduleSignup extends JSXBase.HTMLAttributes<HTMLBarcampScheduleSignupElement> {}
  interface BarcampScheduleTalk extends JSXBase.HTMLAttributes<HTMLBarcampScheduleTalkElement> {
    'talk'?: Talk;
    'user'?: User;
  }
  interface BarcampScheduleTalkAvailable extends JSXBase.HTMLAttributes<HTMLBarcampScheduleTalkAvailableElement> {
    'talk'?: Talk;
    'user'?: User;
  }
  interface BarcampScheduleTalkSignedUp extends JSXBase.HTMLAttributes<HTMLBarcampScheduleTalkSignedUpElement> {
    'speaker'?: User;
    'talk'?: Talk;
    'user'?: User;
  }
  interface BarcampScheduleTalkSigningUp extends JSXBase.HTMLAttributes<HTMLBarcampScheduleTalkSigningUpElement> {
    'signingUp'?: User;
    'talk'?: Talk;
    'user'?: User;
  }
  interface BarcampScheduleTrack extends JSXBase.HTMLAttributes<HTMLBarcampScheduleTrackElement> {
    'track'?: Track;
  }
  interface BarcampSignOut extends JSXBase.HTMLAttributes<HTMLBarcampSignOutElement> {
    'history'?: RouterHistory;
  }
  interface BarcampSponsor extends JSXBase.HTMLAttributes<HTMLBarcampSponsorElement> {
    'sponsor'?: Sponsor;
  }

  interface IntrinsicElements {
    'app-footer': AppFooter;
    'app-header': AppHeader;
    'barcamp-app': BarcampApp;
    'barcamp-auth': BarcampAuth;
    'barcamp-dashboard': BarcampDashboard;
    'barcamp-default-marketing': BarcampDefaultMarketing;
    'barcamp-docs': BarcampDocs;
    'barcamp-event-card': BarcampEventCard;
    'barcamp-forgot-password': BarcampForgotPassword;
    'barcamp-home': BarcampHome;
    'barcamp-host-branding': BarcampHostBranding;
    'barcamp-host-find-sponsors': BarcampHostFindSponsors;
    'barcamp-host-find-venue': BarcampHostFindVenue;
    'barcamp-host-gather-volunteers': BarcampHostGatherVolunteers;
    'barcamp-host-name-your-event': BarcampHostNameYourEvent;
    'barcamp-host-set-agenda': BarcampHostSetAgenda;
    'barcamp-host-set-budget': BarcampHostSetBudget;
    'barcamp-host-set-format': BarcampHostSetFormat;
    'barcamp-profile': BarcampProfile;
    'barcamp-schedule': BarcampSchedule;
    'barcamp-schedule-signup': BarcampScheduleSignup;
    'barcamp-schedule-talk': BarcampScheduleTalk;
    'barcamp-schedule-talk-available': BarcampScheduleTalkAvailable;
    'barcamp-schedule-talk-signed-up': BarcampScheduleTalkSignedUp;
    'barcamp-schedule-talk-signing-up': BarcampScheduleTalkSigningUp;
    'barcamp-schedule-track': BarcampScheduleTrack;
    'barcamp-sign-out': BarcampSignOut;
    'barcamp-sponsor': BarcampSponsor;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


