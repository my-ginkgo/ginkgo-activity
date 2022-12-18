


export interface Segment {
    id: number;
    resource_state: number;
    name: string;
    activity_type: string;
    distance: number;
    average_grade: number;
    maximum_grade: number;
    elevation_high: number;
    elevation_low: number;
    start_latlng: number[];
    end_latlng: number[];
    elevation_profile?: any;
    climb_category: number;
    city: string;
    state: string;
    country: string;
    private: boolean;
    hazardous: boolean;
    starred: boolean;
}

export interface Achievement {
    type_id: number;
    type: string;
    rank: number;
}

export interface SegmentEffort {
    id: any;
    resource_state: number;
    name: string;
    activity: any;
    athlete: Athlete;
    elapsed_time: number;
    moving_time: number;
    start_date: Date;
    start_date_local: Date;
    distance: number;
    start_index: number;
    end_index: number;
    device_watts: boolean;
    segment: Segment;
    pr_rank?: number;
    achievements: Achievement[];
    hidden: boolean;
}

export interface SplitsMetric {
    distance: number;
    elapsed_time: number;
    elevation_difference: number;
    moving_time: number;
    split: number;
    average_speed: number;
    average_grade_adjusted_speed?: any;
    pace_zone: number;
}

export interface SplitsStandard {
    distance: number;
    elapsed_time: number;
    elevation_difference: number;
    moving_time: number;
    split: number;
    average_speed: number;
    average_grade_adjusted_speed?: any;
    pace_zone: number;
}

export interface Lap {
    id: number;
    resource_state: number;
    name: string;
    activity: any;
    athlete: Athlete;
    elapsed_time: number;
    moving_time: number;
    start_date: Date;
    start_date_local: Date;
    distance: number;
    start_index: number;
    end_index: number;
    total_elevation_gain: number;
    average_speed: number;
    max_speed: number;
    device_watts: boolean;
    lap_index: number;
    split: number;
}

export interface StravaPhotos {
    primary?: any;
    count: number;
}

export interface StatsVisibility {
    type: string;
    visibility: string;
}

export interface StravaActivity {
    resource_state: number;
    athlete: StravaActivityAthlete;
    name: string;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    total_elevation_gain: number;
    type: string;
    sport_type: string;
    id: number;
    start_date: Date;
    start_date_local: Date;
    timezone: string;
    utc_offset: number;
    location_city?: any;
    location_state?: any;
    location_country?: any;
    achievement_count: number;
    kudos_count: number;
    comment_count: number;
    athlete_count: number;
    photo_count: number;
    map: StravaActivityMap;
    trainer: boolean;
    commute: boolean;
    manual: boolean;
    private: boolean;
    visibility: string;
    flagged: boolean;
    gear_id?: any;
    start_latlng: number[];
    end_latlng: number[];
    average_speed: number;
    max_speed: number;
    average_watts: number;
    kilojoules: number;
    device_watts: boolean;
    has_heartrate: boolean;
    average_heartrate: number;
    max_heartrate: number;
    heartrate_opt_out: boolean;
    display_hide_heartrate_option: boolean;
    elev_high: number;
    elev_low: number;
    upload_id: number;
    upload_id_str: string;
    external_id: string;
    from_accepted_tag: boolean;
    pr_count: number;
    total_photo_count: number;
    has_kudoed: boolean;
}

export interface StravaActivityDetails {
    resource_state: number;
    athlete: Athlete;
    name: string;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    total_elevation_gain: number;
    type: string;
    sport_type: string;
    workout_type: number;
    id: number;
    start_date: Date;
    start_date_local: Date;
    timezone: string;
    utc_offset: number;
    location_city?: any;
    location_state?: any;
    location_country?: any;
    achievement_count: number;
    kudos_count: number;
    comment_count: number;
    athlete_count: number;
    photo_count: number;
    map: StravaActivityMap;
    trainer: boolean;
    commute: boolean;
    manual: boolean;
    private: boolean;
    visibility: string;
    flagged: boolean;
    gear_id?: any;
    start_latlng: number[];
    end_latlng: number[];
    average_speed: number;
    max_speed: number;
    device_watts: boolean;
    has_heartrate: boolean;
    heartrate_opt_out: boolean;
    display_hide_heartrate_option: boolean;
    elev_high: number;
    elev_low: number;
    upload_id: number;
    upload_id_str: string;
    external_id: string;
    from_accepted_tag: boolean;
    pr_count: number;
    total_photo_count: number;
    has_kudoed: boolean;
    description?: any;
    calories: number;
    perceived_exertion: number;
    prefer_perceived_exertion: boolean;
    segment_efforts: SegmentEffort[];
    splits_metric: SplitsMetric[];
    splits_standard: SplitsStandard[];
    laps: Lap[];
    photos: StravaPhotos;
    stats_visibility: StatsVisibility[];
    hide_from_home: boolean;
    device_name: string;
    embed_token: string;
    available_zones: any[];
}

export interface StravaActivityAthlete {
    id: number;
    resource_state: number;
}

export interface StravaActivityMap {
    id: string;
    summary_polyline: string;
    resource_state: number;
    polyline?: string;

}

export interface Athlete {
    id: number;
    resource_state: number;

    username: string;
    firstname: string;
    lastname: string;
    bio?: any;
    city: string;
    state: string;
    country?: any;
    sex?: any;
    premium: boolean;
    summit: boolean;
    createdAt: Date;
    updatedAt: Date;
    badgeTypeId: number;
    weight: number;
    profileMedium: string;
    profile: string;
    friend?: any;
    follower?: any;
}
