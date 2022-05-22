const numberWithCommas = (x: any) => {
  const string = '' + Number(x).toFixed(2);
  return string.trim().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default numberWithCommas;
