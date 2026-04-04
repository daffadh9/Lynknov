-- Migration: Update public_pages and page_sections for rich editor support
-- Adds: settings column to public_pages
-- Updates: section_type check constraint on page_sections

-- Add settings column to public_pages to store EditorWorkspaceState (theme, audio, etc.)
ALTER TABLE public.public_pages
ADD COLUMN IF NOT EXISTS settings jsonb NOT NULL DEFAULT '{
  "theme": {
    "accent": "emerald",
    "background": "grid",
    "surface": "soft",
    "typography": "editorial",
    "spacing": "balanced"
  },
  "audio": {
    "trackName": "",
    "duration": "00:00",
    "widgetEnabled": false,
    "loopEnabled": false,
    "volume": 64,
    "placement": "floating"
  }
}'::jsonb;

-- Update section_type check constraint on page_sections
-- First, drop the existing constraint
ALTER TABLE public.page_sections
DROP CONSTRAINT IF EXISTS page_sections_section_type_check;

-- Add the new expanded constraint
ALTER TABLE public.page_sections
ADD CONSTRAINT page_sections_section_type_check
CHECK (section_type IN (
  'hero',
  'about',
  'digital_presence',
  'showcase',
  'storyboard',
  'portfolio',
  'link_hub',
  'testimonials',
  'contact',
  'footer'
));
