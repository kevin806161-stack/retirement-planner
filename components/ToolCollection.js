import Link from "next/link";
import ToolArtwork from "./ToolArtwork";
import { tools } from "../lib/tools";

export default function ToolCollection({ variant = "home" }) {
  const full = variant === "full";
  return (
    <div className="tool-collection">
      {tools.map((tool, index) => (
        <Link href={tool.href} key={tool.href} className={`crafted-tool ${index === 0 ? "crafted-tool--featured" : ""}`}>
          <div className="crafted-tool-meta"><span>{tool.topic}</span>{tool.badge && <span className="crafted-tool-badge">{tool.badge}</span>}</div>
          <ToolArtwork kind={tool.kind} />
          <div className="crafted-tool-copy">
            <h3>{full ? tool.title : tool.label}</h3>
            <p>{full ? tool.desc : tool.homeDesc}</p>
          </div>
          <span className="crafted-tool-action">{full ? "開始試算" : "開啟"}<span aria-hidden="true">↗</span></span>
        </Link>
      ))}
    </div>
  );
}
