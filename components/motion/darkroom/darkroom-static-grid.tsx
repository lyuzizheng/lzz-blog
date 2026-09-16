import { DARKROOM_PHOTOS } from "@/lib/darkroom";

/**
 * BRAWUKA-271 · No-JS / crawler fallback for /photography.
 * BRAWUKA-343 · The interactive gallery is retired — the Darkroom Atlas (OSM
 * world map) is the only interface, and this server-rendered grid is its
 * no-JS reading: every framed photo with zero client JS, kept out of the
 * first-load chunk by construction.
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
