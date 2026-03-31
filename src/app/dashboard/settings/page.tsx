import React from "react";
import SettingsPageClient from "./SettingsPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pengaturan | Lynknov",
  description: "Kelola identitas akun, preferensi dasar, dan keamanan utama Lynknov milikmu.",
};

export default function SettingsPage() {
  return <SettingsPageClient />;
}
