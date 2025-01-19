import { ColorRing } from 'react-loader-spinner';

export function ButtonLoader() {
  return (
    <ColorRing
      visible={true}
      height="25"
      width="25"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={['#000', '#000', '#000', '#000', '#000']}
    />
  );
}
