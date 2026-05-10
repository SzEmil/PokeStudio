import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { spriteOfficial, spriteHome, prettyName, paddedId } from '../../utils/pokeUtils';
import css from './EvolutionChain.module.css';
import { LuArrowRight } from 'react-icons/lu';

interface ChainLink {
  species: { name: string; url: string };
  evolves_to: ChainLink[];
  evolution_details?: { trigger?: { name: string }; min_level?: number; item?: { name: string } }[];
}

interface Props {
  chain: { chain: ChainLink } | null;
  loading?: boolean;
  currentId?: number;
}

function flatten(chain: ChainLink): { name: string; id: number; trigger?: string }[][] {
  const tiers: { name: string; id: number; trigger?: string }[][] = [];

  function walk(node: ChainLink, tier: number) {
    const url = node.species.url;
    const id = Number(url.match(/\/pokemon-species\/(\d+)\/?/)?.[1] ?? 0);
    if (!tiers[tier]) tiers[tier] = [];
    tiers[tier].push({
      name: node.species.name,
      id,
      trigger: node.evolution_details?.[0]?.min_level
        ? `Lv. ${node.evolution_details[0].min_level}`
        : node.evolution_details?.[0]?.item?.name
        ? `Use ${prettyName(node.evolution_details[0].item.name)}`
        : node.evolution_details?.[0]?.trigger?.name
        ? prettyName(node.evolution_details[0].trigger.name)
        : undefined,
    });
    node.evolves_to.forEach(child => walk(child, tier + 1));
  }
  walk(chain, 0);
  return tiers;
}

export const EvolutionChain = ({ chain, loading, currentId }: Props) => {
  const tiers = useMemo(() => (chain ? flatten(chain.chain) : []), [chain]);

  if (loading) {
    return <div className={css.placeholder}>Loading evolution chain…</div>;
  }
  if (!chain || tiers.length === 0) {
    return <div className={css.placeholder}>No evolution data available.</div>;
  }
  if (tiers.length === 1 && tiers[0].length === 1) {
    return (
      <div className={css.placeholder}>
        <strong>{prettyName(tiers[0][0].name)}</strong> does not evolve.
      </div>
    );
  }

  return (
    <div className={css.row}>
      {tiers.map((tier, ti) => (
        <div key={ti} className={css.tierGroup}>
          <div className={css.tier}>
            {tier.map((node, ni) => (
              <motion.div
                key={`${node.id}-${ni}`}
                className={`${css.node} ${node.id === currentId ? css.nodeActive : ''}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ti * 0.1 + ni * 0.05 }}
              >
                <NavLink to={`/pokemon/${node.id}`}>
                  <img
                    src={spriteOfficial(node.id)}
                    onError={e => {
                      e.currentTarget.src = spriteHome(node.id);
                    }}
                    alt={node.name}
                  />
                </NavLink>
                <strong>{prettyName(node.name)}</strong>
                <span className={css.id}>{paddedId(node.id)}</span>
                {node.trigger && <span className={css.trigger}>{node.trigger}</span>}
              </motion.div>
            ))}
          </div>
          {ti < tiers.length - 1 && (
            <div className={css.arrow}>
              <LuArrowRight size={28} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
