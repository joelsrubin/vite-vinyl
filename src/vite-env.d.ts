/// <reference types="vite/client" />

interface Info {
  pagination: Pagination;
  releases: Release[];
}

interface Release {
  id: number;
  instance_id: number;
  date_added: string;
  rating: number;
  basic_information: Basicinformation;
}

interface Basicinformation {
  id: number;
  master_id: number;
  master_url: string;
  resource_url: string;
  thumb: string;
  cover_image: string;
  title: string;
  year: number;
  formats: Format[];
  labels: Label[];
  artists: Artist[];
  genres: string[];
  styles: string[];
}

interface Artist {
  name: string;
  anv: string;
  join: string;
  role: string;
  tracks: string;
  id: number;
  resource_url: string;
}

interface Label {
  name: string;
  catno: string;
  entity_type: string;
  entity_type_name: string;
  id: number;
  resource_url: string;
}

interface Format {
  name: string;
  qty: string;
  text: string;
  descriptions: string[];
}

interface Pagination {
  page: number;
  pages: number;
  per_page: number;
  items: number;
  urls: Urls;
}

interface Urls {}
