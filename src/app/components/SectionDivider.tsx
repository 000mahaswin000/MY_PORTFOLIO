export function SectionDivider({ color = 'purple' }: { color?: 'purple' | 'cyan' | 'rose' }) {
  const gradients: Record<string, string> = {
    purple:
      'linear-gradient(90deg, transparent, rgba(139,92,246,0.35) 30%, rgba(139,92,246,0.35) 70%, transparent)',
    cyan:
      'linear-gradient(90deg, transparent, rgba(6,182,212,0.35) 30%, rgba(6,182,212,0.35) 70%, transparent)',
    rose:
      'linear-gradient(90deg, transparent, rgba(244,63,94,0.3) 30%, rgba(244,63,94,0.3) 70%, transparent)',
  };

  const glowColors: Record<string, string> = {
    purple: 'rgba(139,92,246,0.25)',
    cyan: 'rgba(6,182,212,0.25)',
    rose: 'rgba(244,63,94,0.2)',
  };

  const dotColors: Record<string, string> = {
    purple: '#8b5cf6',
    cyan: '#06b6d4',
    rose: '#f43f5e',
  };

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 20px',
      }}
    >
      {/* Line */}
      <div
        style={{
          width: '100%',
          maxWidth: 800,
          height: 1,
          background: gradients[color],
          boxShadow: `0 0 10px ${glowColors[color]}`,
        }}
      />
      {/* Center dot */}
      <div
        style={{
          position: 'absolute',
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: dotColors[color],
          boxShadow: `0 0 12px ${dotColors[color]}`,
        }}
      />
    </div>
  );
}
