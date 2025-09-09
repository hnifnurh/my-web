"use client";

import ShowcasePageMobile from '@/components/showcase/screens/mobile';
import MediaSwitch from "@/components/shared/media-query-switcher";
import ShowcasePageDekstop from '@/components/showcase/screens/desktop';

export default function ShowcasePage() {
  return (
    <MediaSwitch
      mobile={<ShowcasePageMobile />}
      desktop={<ShowcasePageDekstop />}
      screenWidth={1024}
    />
  )
}