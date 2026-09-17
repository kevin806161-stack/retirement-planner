const artwork = {
  retirement: <><circle cx="120" cy="77" r="54" className="art-muted" /><path d="M66 77a54 54 0 0 1 108 0" className="art-line" /><path d="M42 112h156M58 112v-8M89 112V96M120 112V86M151 112V74M182 112V60" className="art-muted" /><path d="M55 96c48 0 51-40 124-40" className="art-line" /><circle cx="179" cy="56" r="4" className="art-point" /><path d="M120 34v8M77 50l6 6M163 50l-6 6" className="art-muted" /></>,
  pension: <><path d="M35 112h170M53 102V57h22v45M91 102V57h22v45M129 102V57h22v45M167 102V57h22v45" className="art-line" /><path d="M42 47h156M120 24v12M57 36h126" className="art-muted" /><path d="M64 77h112" className="art-muted" /></>,
  fire: <><path d="M32 102h176M120 30a41 41 0 0 1 41 41" className="art-muted" /><path d="M79 71a41 41 0 0 1 82 0M36 118c48 0 55-44 96-44h61" className="art-line" /><path d="m184 67 10 7-10 7M120 12v8M69 30l7 7M171 30l-7 7" className="art-muted" /><circle cx="36" cy="118" r="3" className="art-point" /></>,
  compound: <><path d="M36 24v94h169M36 86h169M36 54h169M78 24v94M120 24v94M162 24v94" className="art-muted" /><path d="M38 108c78 0 111-16 159-82" className="art-line" /><path d="m38 108 159-36" className="art-secondary" /><circle cx="197" cy="26" r="4" className="art-point" /></>,
  dividend: <><path d="M33 117h174M47 105V76h25v29M87 105V58h25v47M127 105V76h25v29M167 105V41h25v64" className="art-line" /><path d="M47 29h145M60 25v8M100 25v8M140 25v8M180 25v8" className="art-muted" /><circle cx="60" cy="59" r="3" className="art-point" /><circle cx="100" cy="41" r="3" className="art-point" /><circle cx="140" cy="59" r="3" className="art-point" /><circle cx="180" cy="24" r="3" className="art-point" /></>,
  couple: <><path d="M33 112c61 0 81-66 166-66" className="art-line" /><path d="M33 88c61 0 81-66 166-66" className="art-secondary" /><path d="M33 128h173M71 27v96M120 27v96M169 27v96" className="art-muted" /><circle cx="199" cy="46" r="4" className="art-point" /><circle cx="199" cy="22" r="4" className="art-point" /></>,
  comparison: <><path d="M33 24v94h174M33 70h174" className="art-muted" /><path d="M35 112h30V91h31V70h31V49h31V28h45" className="art-line" /><path d="M35 103 203 41" className="art-secondary" /><circle cx="203" cy="28" r="3" className="art-point" /><circle cx="203" cy="41" r="3" className="art-point" /></>,
};

export default function ToolArtwork({ kind }) {
  return <svg className={`tool-artwork tool-artwork--${kind}`} viewBox="0 0 240 145" fill="none" aria-hidden="true" focusable="false">{artwork[kind]}</svg>;
}
