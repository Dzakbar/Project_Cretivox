type SplitTextProps = {
  text: string;
  className?: string;
};

export function SplitText({ text, className }: SplitTextProps) {
  return (
    <span aria-label={text} className={className}>
      {text.split(/(\s+)/).map((part, partIndex) => {
        if (/^\s+$/.test(part)) {
          return (
            <span aria-hidden="true" className="split-space" key={`space-${partIndex}`}>
              {part}
            </span>
          );
        }

        return (
          <span aria-hidden="true" className="split-word" key={`word-${partIndex}`}>
            {Array.from(part).map((character, characterIndex) => (
              <span className="char" key={`${character}-${characterIndex}`}>
                {character}
              </span>
            ))}
          </span>
        );
      })}
    </span>
  );
}
