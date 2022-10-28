import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

const cookieButtonStyle = css`
  margin-left: 20px;
`;
const cookieBannerStyles = (isOpen) => css`
  height: 20px;
  padding: 5px;
  transition: all 0, 5s ease-in-out;

  ${!isOpen &&
  css`
    height: 0;
    padding: 0;
    overflow: hidden;
  `}
`;

export default function CookieBanner() {
  const [isBannerOpen, setIsBannerOpen] = useState(true);
  useEffect(() => {
    const initialValue = window.localStorage.getItem('IsBannerOpen');
    if (initialValue !== null) {
      setIsBannerOpen(JSON.parse(initialValue));
    }
  }, []);

  return (
    <div css={cookieBannerStyles(isBannerOpen)}>
      {/* {JSON.stringify(isBannerOpen)} */}
      <span>Please accept our cookie policy</span>

      {''}

      <button
        css={cookieButtonStyle}
        onClick={() => {
          setIsBannerOpen(false);
          window.localStorage.setItem('IsBannerOpen', false);
        }}
      >
        yes
      </button>
    </div>
  );
}
