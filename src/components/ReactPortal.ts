import ReactDom from 'react-dom';

interface ReactPortalProps {
  containerId?: string;
  children: any;
}

export default function ReactPortal({ containerId = 'portal-root', children }: ReactPortalProps) {
  let conatiner = document.getElementById(containerId);

  if (!conatiner) {
    conatiner = document.createElement('div');
    conatiner.setAttribute('id', containerId);
    document.body.appendChild(conatiner);
  }

  return ReactDom.createPortal(children, conatiner);
}
