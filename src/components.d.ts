/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { LineItemList } from "./models/LineItemList";
export namespace Components {
    interface AppFooter {
    }
    interface AppHeader {
    }
    interface BarcampApp {
    }
    interface BarcampAuth {
    }
    interface BarcampAuthChoiceGuest {
    }
    interface BarcampAuthChoiceSignIn {
    }
    interface BarcampAuthChoiceSignUp {
        "user": User;
    }
    interface BarcampAuthChoices {
    }
    interface BarcampDashboard {
    }
    interface BarcampDefaultMarketing {
        "slug": string;
        "year": string;
    }
    interface BarcampDocs {
        "name": string;
    }
    interface BarcampEventCard {
        "conference": Conference;
        "get_conf": () => Promise<Conference>;
        "get_user": () => Promise<import("/Users/will/Sites/barcamp/app/src/models/User").default>;
        "user": User;
    }
    interface BarcampForgotPassword {
    }
    interface BarcampHome {
    }
    interface BarcampHost {
        "conferenceId": string;
        "tabId": string;
    }
    interface BarcampHostBranding {
    }
    interface BarcampHostEventPreview {
        "color": ThemeableColors;
        "conference": Conference;
        "dark": boolean;
        "lineItems": LineItemList;
        "mantra": string;
        "name": string;
        "showBudget": boolean;
        "showVenue": boolean;
        "type": string;
    }
    interface BarcampHostFindSponsors {
    }
    interface BarcampHostFindVenue {
    }
    interface BarcampHostGatherVolunteers {
    }
    interface BarcampHostNameYourEvent {
    }
    interface BarcampHostSetAgenda {
    }
    interface BarcampHostSetBudget {
    }
    interface BarcampHostSetFormat {
    }
    interface BarcampProfile {
    }
    interface BarcampSchedule {
        "getConference": () => Promise<Conference>;
        "slug": string;
        "user": User;
        "year": string;
    }
    interface BarcampSchedulePublished {
        "active": string;
        "entry": any;
    }
    interface BarcampScheduleSignup {
    }
    interface BarcampScheduleSwitchTalk {
        "conference": Conference;
        "slug": string;
        "user": User;
        "year": string;
    }
    interface BarcampScheduleTalk {
        "talk": Talk;
    }
    interface BarcampScheduleTalkAvailable {
        "readonly": boolean;
        "talk": Talk;
        "user": User;
        "writable": boolean;
    }
    interface BarcampScheduleTalkGroup {
        "active": string;
        "entry": any;
    }
    interface BarcampScheduleTalkSignedUp {
        "readonly": boolean;
        "speaker": User;
        "talk": Talk;
        "user": User;
    }
    interface BarcampScheduleTalkSigningUp {
        "readonly": boolean;
        "signingUp": User;
        "talk": Talk;
        "user": User;
    }
    interface BarcampScheduleTrack {
        "track": Track;
    }
    interface BarcampSignOut {
    }
    interface BarcampSponsor {
        "sponsor": Sponsor;
    }
    interface CountDown {
        "time": DayjsType;
    }
    interface UpcomingBarcamps {
    }
}
export interface CountDownCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCountDownElement;
}
declare global {
    interface HTMLAppFooterElement extends Components.AppFooter, HTMLStencilElement {
    }
    var HTMLAppFooterElement: {
        prototype: HTMLAppFooterElement;
        new (): HTMLAppFooterElement;
    };
    interface HTMLAppHeaderElement extends Components.AppHeader, HTMLStencilElement {
    }
    var HTMLAppHeaderElement: {
        prototype: HTMLAppHeaderElement;
        new (): HTMLAppHeaderElement;
    };
    interface HTMLBarcampAppElement extends Components.BarcampApp, HTMLStencilElement {
    }
    var HTMLBarcampAppElement: {
        prototype: HTMLBarcampAppElement;
        new (): HTMLBarcampAppElement;
    };
    interface HTMLBarcampAuthElement extends Components.BarcampAuth, HTMLStencilElement {
    }
    var HTMLBarcampAuthElement: {
        prototype: HTMLBarcampAuthElement;
        new (): HTMLBarcampAuthElement;
    };
    interface HTMLBarcampAuthChoiceGuestElement extends Components.BarcampAuthChoiceGuest, HTMLStencilElement {
    }
    var HTMLBarcampAuthChoiceGuestElement: {
        prototype: HTMLBarcampAuthChoiceGuestElement;
        new (): HTMLBarcampAuthChoiceGuestElement;
    };
    interface HTMLBarcampAuthChoiceSignInElement extends Components.BarcampAuthChoiceSignIn, HTMLStencilElement {
    }
    var HTMLBarcampAuthChoiceSignInElement: {
        prototype: HTMLBarcampAuthChoiceSignInElement;
        new (): HTMLBarcampAuthChoiceSignInElement;
    };
    interface HTMLBarcampAuthChoiceSignUpElement extends Components.BarcampAuthChoiceSignUp, HTMLStencilElement {
    }
    var HTMLBarcampAuthChoiceSignUpElement: {
        prototype: HTMLBarcampAuthChoiceSignUpElement;
        new (): HTMLBarcampAuthChoiceSignUpElement;
    };
    interface HTMLBarcampAuthChoicesElement extends Components.BarcampAuthChoices, HTMLStencilElement {
    }
    var HTMLBarcampAuthChoicesElement: {
        prototype: HTMLBarcampAuthChoicesElement;
        new (): HTMLBarcampAuthChoicesElement;
    };
    interface HTMLBarcampDashboardElement extends Components.BarcampDashboard, HTMLStencilElement {
    }
    var HTMLBarcampDashboardElement: {
        prototype: HTMLBarcampDashboardElement;
        new (): HTMLBarcampDashboardElement;
    };
    interface HTMLBarcampDefaultMarketingElement extends Components.BarcampDefaultMarketing, HTMLStencilElement {
    }
    var HTMLBarcampDefaultMarketingElement: {
        prototype: HTMLBarcampDefaultMarketingElement;
        new (): HTMLBarcampDefaultMarketingElement;
    };
    interface HTMLBarcampDocsElement extends Components.BarcampDocs, HTMLStencilElement {
    }
    var HTMLBarcampDocsElement: {
        prototype: HTMLBarcampDocsElement;
        new (): HTMLBarcampDocsElement;
    };
    interface HTMLBarcampEventCardElement extends Components.BarcampEventCard, HTMLStencilElement {
    }
    var HTMLBarcampEventCardElement: {
        prototype: HTMLBarcampEventCardElement;
        new (): HTMLBarcampEventCardElement;
    };
    interface HTMLBarcampForgotPasswordElement extends Components.BarcampForgotPassword, HTMLStencilElement {
    }
    var HTMLBarcampForgotPasswordElement: {
        prototype: HTMLBarcampForgotPasswordElement;
        new (): HTMLBarcampForgotPasswordElement;
    };
    interface HTMLBarcampHomeElement extends Components.BarcampHome, HTMLStencilElement {
    }
    var HTMLBarcampHomeElement: {
        prototype: HTMLBarcampHomeElement;
        new (): HTMLBarcampHomeElement;
    };
    interface HTMLBarcampHostElement extends Components.BarcampHost, HTMLStencilElement {
    }
    var HTMLBarcampHostElement: {
        prototype: HTMLBarcampHostElement;
        new (): HTMLBarcampHostElement;
    };
    interface HTMLBarcampHostBrandingElement extends Components.BarcampHostBranding, HTMLStencilElement {
    }
    var HTMLBarcampHostBrandingElement: {
        prototype: HTMLBarcampHostBrandingElement;
        new (): HTMLBarcampHostBrandingElement;
    };
    interface HTMLBarcampHostEventPreviewElement extends Components.BarcampHostEventPreview, HTMLStencilElement {
    }
    var HTMLBarcampHostEventPreviewElement: {
        prototype: HTMLBarcampHostEventPreviewElement;
        new (): HTMLBarcampHostEventPreviewElement;
    };
    interface HTMLBarcampHostFindSponsorsElement extends Components.BarcampHostFindSponsors, HTMLStencilElement {
    }
    var HTMLBarcampHostFindSponsorsElement: {
        prototype: HTMLBarcampHostFindSponsorsElement;
        new (): HTMLBarcampHostFindSponsorsElement;
    };
    interface HTMLBarcampHostFindVenueElement extends Components.BarcampHostFindVenue, HTMLStencilElement {
    }
    var HTMLBarcampHostFindVenueElement: {
        prototype: HTMLBarcampHostFindVenueElement;
        new (): HTMLBarcampHostFindVenueElement;
    };
    interface HTMLBarcampHostGatherVolunteersElement extends Components.BarcampHostGatherVolunteers, HTMLStencilElement {
    }
    var HTMLBarcampHostGatherVolunteersElement: {
        prototype: HTMLBarcampHostGatherVolunteersElement;
        new (): HTMLBarcampHostGatherVolunteersElement;
    };
    interface HTMLBarcampHostNameYourEventElement extends Components.BarcampHostNameYourEvent, HTMLStencilElement {
    }
    var HTMLBarcampHostNameYourEventElement: {
        prototype: HTMLBarcampHostNameYourEventElement;
        new (): HTMLBarcampHostNameYourEventElement;
    };
    interface HTMLBarcampHostSetAgendaElement extends Components.BarcampHostSetAgenda, HTMLStencilElement {
    }
    var HTMLBarcampHostSetAgendaElement: {
        prototype: HTMLBarcampHostSetAgendaElement;
        new (): HTMLBarcampHostSetAgendaElement;
    };
    interface HTMLBarcampHostSetBudgetElement extends Components.BarcampHostSetBudget, HTMLStencilElement {
    }
    var HTMLBarcampHostSetBudgetElement: {
        prototype: HTMLBarcampHostSetBudgetElement;
        new (): HTMLBarcampHostSetBudgetElement;
    };
    interface HTMLBarcampHostSetFormatElement extends Components.BarcampHostSetFormat, HTMLStencilElement {
    }
    var HTMLBarcampHostSetFormatElement: {
        prototype: HTMLBarcampHostSetFormatElement;
        new (): HTMLBarcampHostSetFormatElement;
    };
    interface HTMLBarcampProfileElement extends Components.BarcampProfile, HTMLStencilElement {
    }
    var HTMLBarcampProfileElement: {
        prototype: HTMLBarcampProfileElement;
        new (): HTMLBarcampProfileElement;
    };
    interface HTMLBarcampScheduleElement extends Components.BarcampSchedule, HTMLStencilElement {
    }
    var HTMLBarcampScheduleElement: {
        prototype: HTMLBarcampScheduleElement;
        new (): HTMLBarcampScheduleElement;
    };
    interface HTMLBarcampSchedulePublishedElement extends Components.BarcampSchedulePublished, HTMLStencilElement {
    }
    var HTMLBarcampSchedulePublishedElement: {
        prototype: HTMLBarcampSchedulePublishedElement;
        new (): HTMLBarcampSchedulePublishedElement;
    };
    interface HTMLBarcampScheduleSignupElement extends Components.BarcampScheduleSignup, HTMLStencilElement {
    }
    var HTMLBarcampScheduleSignupElement: {
        prototype: HTMLBarcampScheduleSignupElement;
        new (): HTMLBarcampScheduleSignupElement;
    };
    interface HTMLBarcampScheduleSwitchTalkElement extends Components.BarcampScheduleSwitchTalk, HTMLStencilElement {
    }
    var HTMLBarcampScheduleSwitchTalkElement: {
        prototype: HTMLBarcampScheduleSwitchTalkElement;
        new (): HTMLBarcampScheduleSwitchTalkElement;
    };
    interface HTMLBarcampScheduleTalkElement extends Components.BarcampScheduleTalk, HTMLStencilElement {
    }
    var HTMLBarcampScheduleTalkElement: {
        prototype: HTMLBarcampScheduleTalkElement;
        new (): HTMLBarcampScheduleTalkElement;
    };
    interface HTMLBarcampScheduleTalkAvailableElement extends Components.BarcampScheduleTalkAvailable, HTMLStencilElement {
    }
    var HTMLBarcampScheduleTalkAvailableElement: {
        prototype: HTMLBarcampScheduleTalkAvailableElement;
        new (): HTMLBarcampScheduleTalkAvailableElement;
    };
    interface HTMLBarcampScheduleTalkGroupElement extends Components.BarcampScheduleTalkGroup, HTMLStencilElement {
    }
    var HTMLBarcampScheduleTalkGroupElement: {
        prototype: HTMLBarcampScheduleTalkGroupElement;
        new (): HTMLBarcampScheduleTalkGroupElement;
    };
    interface HTMLBarcampScheduleTalkSignedUpElement extends Components.BarcampScheduleTalkSignedUp, HTMLStencilElement {
    }
    var HTMLBarcampScheduleTalkSignedUpElement: {
        prototype: HTMLBarcampScheduleTalkSignedUpElement;
        new (): HTMLBarcampScheduleTalkSignedUpElement;
    };
    interface HTMLBarcampScheduleTalkSigningUpElement extends Components.BarcampScheduleTalkSigningUp, HTMLStencilElement {
    }
    var HTMLBarcampScheduleTalkSigningUpElement: {
        prototype: HTMLBarcampScheduleTalkSigningUpElement;
        new (): HTMLBarcampScheduleTalkSigningUpElement;
    };
    interface HTMLBarcampScheduleTrackElement extends Components.BarcampScheduleTrack, HTMLStencilElement {
    }
    var HTMLBarcampScheduleTrackElement: {
        prototype: HTMLBarcampScheduleTrackElement;
        new (): HTMLBarcampScheduleTrackElement;
    };
    interface HTMLBarcampSignOutElement extends Components.BarcampSignOut, HTMLStencilElement {
    }
    var HTMLBarcampSignOutElement: {
        prototype: HTMLBarcampSignOutElement;
        new (): HTMLBarcampSignOutElement;
    };
    interface HTMLBarcampSponsorElement extends Components.BarcampSponsor, HTMLStencilElement {
    }
    var HTMLBarcampSponsorElement: {
        prototype: HTMLBarcampSponsorElement;
        new (): HTMLBarcampSponsorElement;
    };
    interface HTMLCountDownElement extends Components.CountDown, HTMLStencilElement {
    }
    var HTMLCountDownElement: {
        prototype: HTMLCountDownElement;
        new (): HTMLCountDownElement;
    };
    interface HTMLUpcomingBarcampsElement extends Components.UpcomingBarcamps, HTMLStencilElement {
    }
    var HTMLUpcomingBarcampsElement: {
        prototype: HTMLUpcomingBarcampsElement;
        new (): HTMLUpcomingBarcampsElement;
    };
    interface HTMLElementTagNameMap {
        "app-footer": HTMLAppFooterElement;
        "app-header": HTMLAppHeaderElement;
        "barcamp-app": HTMLBarcampAppElement;
        "barcamp-auth": HTMLBarcampAuthElement;
        "barcamp-auth-choice-guest": HTMLBarcampAuthChoiceGuestElement;
        "barcamp-auth-choice-sign-in": HTMLBarcampAuthChoiceSignInElement;
        "barcamp-auth-choice-sign-up": HTMLBarcampAuthChoiceSignUpElement;
        "barcamp-auth-choices": HTMLBarcampAuthChoicesElement;
        "barcamp-dashboard": HTMLBarcampDashboardElement;
        "barcamp-default-marketing": HTMLBarcampDefaultMarketingElement;
        "barcamp-docs": HTMLBarcampDocsElement;
        "barcamp-event-card": HTMLBarcampEventCardElement;
        "barcamp-forgot-password": HTMLBarcampForgotPasswordElement;
        "barcamp-home": HTMLBarcampHomeElement;
        "barcamp-host": HTMLBarcampHostElement;
        "barcamp-host-branding": HTMLBarcampHostBrandingElement;
        "barcamp-host-event-preview": HTMLBarcampHostEventPreviewElement;
        "barcamp-host-find-sponsors": HTMLBarcampHostFindSponsorsElement;
        "barcamp-host-find-venue": HTMLBarcampHostFindVenueElement;
        "barcamp-host-gather-volunteers": HTMLBarcampHostGatherVolunteersElement;
        "barcamp-host-name-your-event": HTMLBarcampHostNameYourEventElement;
        "barcamp-host-set-agenda": HTMLBarcampHostSetAgendaElement;
        "barcamp-host-set-budget": HTMLBarcampHostSetBudgetElement;
        "barcamp-host-set-format": HTMLBarcampHostSetFormatElement;
        "barcamp-profile": HTMLBarcampProfileElement;
        "barcamp-schedule": HTMLBarcampScheduleElement;
        "barcamp-schedule-published": HTMLBarcampSchedulePublishedElement;
        "barcamp-schedule-signup": HTMLBarcampScheduleSignupElement;
        "barcamp-schedule-switch-talk": HTMLBarcampScheduleSwitchTalkElement;
        "barcamp-schedule-talk": HTMLBarcampScheduleTalkElement;
        "barcamp-schedule-talk-available": HTMLBarcampScheduleTalkAvailableElement;
        "barcamp-schedule-talk-group": HTMLBarcampScheduleTalkGroupElement;
        "barcamp-schedule-talk-signed-up": HTMLBarcampScheduleTalkSignedUpElement;
        "barcamp-schedule-talk-signing-up": HTMLBarcampScheduleTalkSigningUpElement;
        "barcamp-schedule-track": HTMLBarcampScheduleTrackElement;
        "barcamp-sign-out": HTMLBarcampSignOutElement;
        "barcamp-sponsor": HTMLBarcampSponsorElement;
        "count-down": HTMLCountDownElement;
        "upcoming-barcamps": HTMLUpcomingBarcampsElement;
    }
}
declare namespace LocalJSX {
    interface AppFooter {
    }
    interface AppHeader {
    }
    interface BarcampApp {
    }
    interface BarcampAuth {
    }
    interface BarcampAuthChoiceGuest {
    }
    interface BarcampAuthChoiceSignIn {
    }
    interface BarcampAuthChoiceSignUp {
        "user"?: User;
    }
    interface BarcampAuthChoices {
    }
    interface BarcampDashboard {
    }
    interface BarcampDefaultMarketing {
        "slug"?: string;
        "year"?: string;
    }
    interface BarcampDocs {
        "name"?: string;
    }
    interface BarcampEventCard {
        "conference"?: Conference;
        "user"?: User;
    }
    interface BarcampForgotPassword {
    }
    interface BarcampHome {
    }
    interface BarcampHost {
        "conferenceId"?: string;
        "tabId"?: string;
    }
    interface BarcampHostBranding {
    }
    interface BarcampHostEventPreview {
        "color"?: ThemeableColors;
        "conference"?: Conference;
        "dark"?: boolean;
        "lineItems"?: LineItemList;
        "mantra"?: string;
        "name"?: string;
        "showBudget"?: boolean;
        "showVenue"?: boolean;
        "type"?: string;
    }
    interface BarcampHostFindSponsors {
    }
    interface BarcampHostFindVenue {
    }
    interface BarcampHostGatherVolunteers {
    }
    interface BarcampHostNameYourEvent {
    }
    interface BarcampHostSetAgenda {
    }
    interface BarcampHostSetBudget {
    }
    interface BarcampHostSetFormat {
    }
    interface BarcampProfile {
    }
    interface BarcampSchedule {
        "slug"?: string;
        "user"?: User;
        "year"?: string;
    }
    interface BarcampSchedulePublished {
        "active"?: string;
        "entry"?: any;
    }
    interface BarcampScheduleSignup {
    }
    interface BarcampScheduleSwitchTalk {
        "conference"?: Conference;
        "slug"?: string;
        "user"?: User;
        "year"?: string;
    }
    interface BarcampScheduleTalk {
        "talk"?: Talk;
    }
    interface BarcampScheduleTalkAvailable {
        "readonly"?: boolean;
        "talk"?: Talk;
        "user"?: User;
        "writable"?: boolean;
    }
    interface BarcampScheduleTalkGroup {
        "active"?: string;
        "entry"?: any;
    }
    interface BarcampScheduleTalkSignedUp {
        "readonly"?: boolean;
        "speaker"?: User;
        "talk"?: Talk;
        "user"?: User;
    }
    interface BarcampScheduleTalkSigningUp {
        "readonly"?: boolean;
        "signingUp"?: User;
        "talk"?: Talk;
        "user"?: User;
    }
    interface BarcampScheduleTrack {
        "track"?: Track;
    }
    interface BarcampSignOut {
    }
    interface BarcampSponsor {
        "sponsor"?: Sponsor;
    }
    interface CountDown {
        "onReady"?: (event: CountDownCustomEvent<any>) => void;
        "time"?: DayjsType;
    }
    interface UpcomingBarcamps {
    }
    interface IntrinsicElements {
        "app-footer": AppFooter;
        "app-header": AppHeader;
        "barcamp-app": BarcampApp;
        "barcamp-auth": BarcampAuth;
        "barcamp-auth-choice-guest": BarcampAuthChoiceGuest;
        "barcamp-auth-choice-sign-in": BarcampAuthChoiceSignIn;
        "barcamp-auth-choice-sign-up": BarcampAuthChoiceSignUp;
        "barcamp-auth-choices": BarcampAuthChoices;
        "barcamp-dashboard": BarcampDashboard;
        "barcamp-default-marketing": BarcampDefaultMarketing;
        "barcamp-docs": BarcampDocs;
        "barcamp-event-card": BarcampEventCard;
        "barcamp-forgot-password": BarcampForgotPassword;
        "barcamp-home": BarcampHome;
        "barcamp-host": BarcampHost;
        "barcamp-host-branding": BarcampHostBranding;
        "barcamp-host-event-preview": BarcampHostEventPreview;
        "barcamp-host-find-sponsors": BarcampHostFindSponsors;
        "barcamp-host-find-venue": BarcampHostFindVenue;
        "barcamp-host-gather-volunteers": BarcampHostGatherVolunteers;
        "barcamp-host-name-your-event": BarcampHostNameYourEvent;
        "barcamp-host-set-agenda": BarcampHostSetAgenda;
        "barcamp-host-set-budget": BarcampHostSetBudget;
        "barcamp-host-set-format": BarcampHostSetFormat;
        "barcamp-profile": BarcampProfile;
        "barcamp-schedule": BarcampSchedule;
        "barcamp-schedule-published": BarcampSchedulePublished;
        "barcamp-schedule-signup": BarcampScheduleSignup;
        "barcamp-schedule-switch-talk": BarcampScheduleSwitchTalk;
        "barcamp-schedule-talk": BarcampScheduleTalk;
        "barcamp-schedule-talk-available": BarcampScheduleTalkAvailable;
        "barcamp-schedule-talk-group": BarcampScheduleTalkGroup;
        "barcamp-schedule-talk-signed-up": BarcampScheduleTalkSignedUp;
        "barcamp-schedule-talk-signing-up": BarcampScheduleTalkSigningUp;
        "barcamp-schedule-track": BarcampScheduleTrack;
        "barcamp-sign-out": BarcampSignOut;
        "barcamp-sponsor": BarcampSponsor;
        "count-down": CountDown;
        "upcoming-barcamps": UpcomingBarcamps;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-footer": LocalJSX.AppFooter & JSXBase.HTMLAttributes<HTMLAppFooterElement>;
            "app-header": LocalJSX.AppHeader & JSXBase.HTMLAttributes<HTMLAppHeaderElement>;
            "barcamp-app": LocalJSX.BarcampApp & JSXBase.HTMLAttributes<HTMLBarcampAppElement>;
            "barcamp-auth": LocalJSX.BarcampAuth & JSXBase.HTMLAttributes<HTMLBarcampAuthElement>;
            "barcamp-auth-choice-guest": LocalJSX.BarcampAuthChoiceGuest & JSXBase.HTMLAttributes<HTMLBarcampAuthChoiceGuestElement>;
            "barcamp-auth-choice-sign-in": LocalJSX.BarcampAuthChoiceSignIn & JSXBase.HTMLAttributes<HTMLBarcampAuthChoiceSignInElement>;
            "barcamp-auth-choice-sign-up": LocalJSX.BarcampAuthChoiceSignUp & JSXBase.HTMLAttributes<HTMLBarcampAuthChoiceSignUpElement>;
            "barcamp-auth-choices": LocalJSX.BarcampAuthChoices & JSXBase.HTMLAttributes<HTMLBarcampAuthChoicesElement>;
            "barcamp-dashboard": LocalJSX.BarcampDashboard & JSXBase.HTMLAttributes<HTMLBarcampDashboardElement>;
            "barcamp-default-marketing": LocalJSX.BarcampDefaultMarketing & JSXBase.HTMLAttributes<HTMLBarcampDefaultMarketingElement>;
            "barcamp-docs": LocalJSX.BarcampDocs & JSXBase.HTMLAttributes<HTMLBarcampDocsElement>;
            "barcamp-event-card": LocalJSX.BarcampEventCard & JSXBase.HTMLAttributes<HTMLBarcampEventCardElement>;
            "barcamp-forgot-password": LocalJSX.BarcampForgotPassword & JSXBase.HTMLAttributes<HTMLBarcampForgotPasswordElement>;
            "barcamp-home": LocalJSX.BarcampHome & JSXBase.HTMLAttributes<HTMLBarcampHomeElement>;
            "barcamp-host": LocalJSX.BarcampHost & JSXBase.HTMLAttributes<HTMLBarcampHostElement>;
            "barcamp-host-branding": LocalJSX.BarcampHostBranding & JSXBase.HTMLAttributes<HTMLBarcampHostBrandingElement>;
            "barcamp-host-event-preview": LocalJSX.BarcampHostEventPreview & JSXBase.HTMLAttributes<HTMLBarcampHostEventPreviewElement>;
            "barcamp-host-find-sponsors": LocalJSX.BarcampHostFindSponsors & JSXBase.HTMLAttributes<HTMLBarcampHostFindSponsorsElement>;
            "barcamp-host-find-venue": LocalJSX.BarcampHostFindVenue & JSXBase.HTMLAttributes<HTMLBarcampHostFindVenueElement>;
            "barcamp-host-gather-volunteers": LocalJSX.BarcampHostGatherVolunteers & JSXBase.HTMLAttributes<HTMLBarcampHostGatherVolunteersElement>;
            "barcamp-host-name-your-event": LocalJSX.BarcampHostNameYourEvent & JSXBase.HTMLAttributes<HTMLBarcampHostNameYourEventElement>;
            "barcamp-host-set-agenda": LocalJSX.BarcampHostSetAgenda & JSXBase.HTMLAttributes<HTMLBarcampHostSetAgendaElement>;
            "barcamp-host-set-budget": LocalJSX.BarcampHostSetBudget & JSXBase.HTMLAttributes<HTMLBarcampHostSetBudgetElement>;
            "barcamp-host-set-format": LocalJSX.BarcampHostSetFormat & JSXBase.HTMLAttributes<HTMLBarcampHostSetFormatElement>;
            "barcamp-profile": LocalJSX.BarcampProfile & JSXBase.HTMLAttributes<HTMLBarcampProfileElement>;
            "barcamp-schedule": LocalJSX.BarcampSchedule & JSXBase.HTMLAttributes<HTMLBarcampScheduleElement>;
            "barcamp-schedule-published": LocalJSX.BarcampSchedulePublished & JSXBase.HTMLAttributes<HTMLBarcampSchedulePublishedElement>;
            "barcamp-schedule-signup": LocalJSX.BarcampScheduleSignup & JSXBase.HTMLAttributes<HTMLBarcampScheduleSignupElement>;
            "barcamp-schedule-switch-talk": LocalJSX.BarcampScheduleSwitchTalk & JSXBase.HTMLAttributes<HTMLBarcampScheduleSwitchTalkElement>;
            "barcamp-schedule-talk": LocalJSX.BarcampScheduleTalk & JSXBase.HTMLAttributes<HTMLBarcampScheduleTalkElement>;
            "barcamp-schedule-talk-available": LocalJSX.BarcampScheduleTalkAvailable & JSXBase.HTMLAttributes<HTMLBarcampScheduleTalkAvailableElement>;
            "barcamp-schedule-talk-group": LocalJSX.BarcampScheduleTalkGroup & JSXBase.HTMLAttributes<HTMLBarcampScheduleTalkGroupElement>;
            "barcamp-schedule-talk-signed-up": LocalJSX.BarcampScheduleTalkSignedUp & JSXBase.HTMLAttributes<HTMLBarcampScheduleTalkSignedUpElement>;
            "barcamp-schedule-talk-signing-up": LocalJSX.BarcampScheduleTalkSigningUp & JSXBase.HTMLAttributes<HTMLBarcampScheduleTalkSigningUpElement>;
            "barcamp-schedule-track": LocalJSX.BarcampScheduleTrack & JSXBase.HTMLAttributes<HTMLBarcampScheduleTrackElement>;
            "barcamp-sign-out": LocalJSX.BarcampSignOut & JSXBase.HTMLAttributes<HTMLBarcampSignOutElement>;
            "barcamp-sponsor": LocalJSX.BarcampSponsor & JSXBase.HTMLAttributes<HTMLBarcampSponsorElement>;
            "count-down": LocalJSX.CountDown & JSXBase.HTMLAttributes<HTMLCountDownElement>;
            "upcoming-barcamps": LocalJSX.UpcomingBarcamps & JSXBase.HTMLAttributes<HTMLUpcomingBarcampsElement>;
        }
    }
}
