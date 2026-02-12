export interface PaftCountry {
    name: string;
    coords: [number, number];
    type: 'headquarters' | 'office';
    region: string;
}

export const paftCountries: PaftCountry[] = [
    // Headquarters
    { name: 'Egypt', coords: [26.8206, 30.8025], type: 'headquarters', region: 'Middle East & Africa' },

    // Middle East & Africa
    { name: 'Morocco', coords: [31.7917, -7.0926], type: 'office', region: 'Middle East & Africa' },
    { name: 'Sudan', coords: [12.8628, 30.2176], type: 'office', region: 'Middle East & Africa' },
    { name: 'Syria', coords: [34.8021, 38.9968], type: 'office', region: 'Middle East & Africa' },
    { name: 'Kenya', coords: [-0.0236, 37.9062], type: 'office', region: 'Middle East & Africa' },
    { name: 'Saudi Arabia', coords: [23.8859, 45.0792], type: 'office', region: 'Middle East & Africa' },
    { name: 'Libya', coords: [26.3351, 17.2283], type: 'office', region: 'Middle East & Africa' },
    { name: 'Jordan', coords: [30.5852, 36.2384], type: 'office', region: 'Middle East & Africa' },
    { name: 'Algeria', coords: [28.0339, 1.6596], type: 'office', region: 'Middle East & Africa' },
    { name: 'UAE', coords: [23.4241, 53.8478], type: 'office', region: 'Middle East & Africa' },
    { name: 'Lebanon', coords: [33.8547, 35.8623], type: 'office', region: 'Middle East & Africa' },
    { name: 'Ghana', coords: [7.9465, -1.0232], type: 'office', region: 'Middle East & Africa' },
    { name: 'Nigeria', coords: [9.082, 8.6753], type: 'office', region: 'Middle East & Africa' },
];

export const REGIONS = [...new Set(paftCountries.map((c) => c.region))];
export const TOTAL_COUNTRIES = paftCountries.length;
export const TOTAL_REGIONS = REGIONS.length;
