import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function CustomLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link
        style={{ textDecoration: match ? 'underline' : 'none' }}
        to={to}
        {...props}
      >
        {children}
      </Link>
      {match && ' (active)'}
    </div>
  );
}
