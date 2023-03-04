const getName = async (): Promise<string> => {
  // Simulate async request with a timeout
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const names = [
    "Columbian",
    "Brazilian",
    "Ethiopian",
    "Kenyan",
    "Guatemalan",
    "Costa Rican",
    "Honduran",
    "Peruvian",
    "Mexican",
  ];
  const randomIndex = Math.floor(Math.random() * names.length);

  return names[randomIndex];
};


export {getName}