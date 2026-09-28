export default function OverlayLayout({ children }) {
  return <div className="ovl-root"><style>{`html,body,main{background:transparent!important}body{overflow:hidden}`}</style>{children}</div>;
}
