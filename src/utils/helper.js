export const toTextCase = (string) => {
   if (string.length === 0) {
      return string; // Return empty string if input is empty
   }

   const firstLetter = string[0].toUpperCase();
   const others = string.slice(1);

   return firstLetter + others;
}

export const formatDate = (todoDate) => {
   const date = new Date(todoDate)
   const day = String(date.getDate()).padStart(2, '0');
   const month = String(date.getMonth() + 1).padStart(2, '0');
   const year = date.getFullYear();
   const format = `${day}/${month}/${year}`
   return format
}
