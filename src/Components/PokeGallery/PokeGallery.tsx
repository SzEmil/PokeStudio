import { useMemo } from 'react';
import css from './PokeGallery.module.css';

interface Sprites {
  back_default?: string;
  back_female?: string;
  back_shiny?: string;
  back_shiny_female?: string;
  front_default?: string;
  front_female?: string;
  front_shiny?: string;
  front_shiny_female?: string;
  other?: {
    dream_world?: { front_default?: string };
    home?: { front_default?: string };
    'official-artwork'?: { front_default?: string };
  };
}

interface Props {
  sprites: Sprites;
}

const VARIANT_LABEL: Record<string, string> = {
  front_default: 'Front',
  back_default: 'Back',
  front_shiny: 'Shiny Front',
  back_shiny: 'Shiny Back',
  front_female: 'Female Front',
  back_female: 'Female Back',
  front_shiny_female: 'Shiny ♀ Front',
  back_shiny_female: 'Shiny ♀ Back',
  dream_world: 'Dream World',
  home: 'Home',
  official_artwork: 'Official Artwork',
};

export const PokeGallery = ({ sprites }: Props) => {
  const items = useMemo(() => {
    const list: { key: string; label: string; src: string }[] = [];
    Object.entries(sprites).forEach(([k, v]) => {
      if (typeof v === 'string') list.push({ key: k, label: VARIANT_LABEL[k] ?? k, src: v });
    });
    if (sprites.other?.['official-artwork']?.front_default) {
      list.unshift({
        key: 'official_artwork',
        label: VARIANT_LABEL.official_artwork,
        src: sprites.other['official-artwork'].front_default,
      });
    }
    if (sprites.other?.home?.front_default) {
      list.unshift({
        key: 'home',
        label: VARIANT_LABEL.home,
        src: sprites.other.home.front_default,
      });
    }
    if (sprites.other?.dream_world?.front_default) {
      list.push({
        key: 'dream_world',
        label: VARIANT_LABEL.dream_world,
        src: sprites.other.dream_world.front_default,
      });
    }
    return list;
  }, [sprites]);

  return (
    <div className={css.container}>
      <div className={css.head}>
        <h3 className={css.title}>Gallery</h3>
      </div>
      <div className={css.grid}>
        {items.map(item => (
          <a
            key={`${item.key}-${item.src}`}
            className={css.tile}
            href={item.src}
            target="_blank"
            rel="noreferrer"
            title={item.label}
          >
            <img loading="lazy" src={item.src} alt={item.label} className={css.image} />
            <span className={css.tileLabel}>{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};
