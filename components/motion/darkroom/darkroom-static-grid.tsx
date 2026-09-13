import { DARKROOM_PHOTOS } from "@/lib/darkroom";

/**
 * BRAWUKA-271 · No-JS / crawler fallback for the darkroom gallery.
 *
 * Server-rendered static masonry of the same photos the interactive
 * DarkroomGallery shows — deliberately free of client components so the
 * gallery bundle stays out of the /photography first-load chunk.
 */
export function DarkroomStaticGrid() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
        {DARKROOM_PHOTOS.map((photo) => (
          <figure
            key={photo.id}
            className="overflow-hidden rounded-md border border-border-plate bg-chamber"
            style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
          >
            {photo.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            ) : (
              <figcaption className="p-4 font-telemetry text-xs text-muted">
                {photo.title} — {photo.frame}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}
