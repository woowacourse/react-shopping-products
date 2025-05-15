import Spinner from '../../assets/lodingSpin.gif';

function LoadingIcon() {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h3>잠시만 기다려주세요</h3>
      <img src={Spinner} alt='로딩 스피너 아이콘' width='50%' />
    </div>
  );
}

export default LoadingIcon;
