import { FileHelper } from "../../../src/Utils/File.helper";


describe('File Helper', () => {

  describe('createAndWriteInFile', () => {
    it('should return the pathFile when it create and write on the file ', () => {
        let pathFile:string = "./tests/Unit/Utils/resources/fileToTest.txt";
        let dataText:string ="Welcome to test :D ";
        
        const result = FileHelper.createAndWriteInFile(pathFile,dataText);

        expect(result).toEqual(pathFile);
    });

    it('should return false after giving a wrong path file  ', () => {
        let pathFile:string = "/var/fileToTest.txt";
        let dataText:string ="Welcome to test :D ";
       
        const result = FileHelper.createAndWriteInFile(pathFile,dataText);

        expect(result).toBeFalsy();
    });

  })

  describe('writeInFileSync',() => {

    it('should return the pathFile when it wrote succesfully on the file ', () => {
      let pathFile:string = "./tests/Unit/Utils/resources/fileToTest.txt";
      let dataText:string ="Welcomed to test :D ";
      
      const result = FileHelper.writeInFileSync(pathFile,dataText);

      expect(result).toEqual(pathFile);
      });

    it('should return false when the pathFile is wrong  ', () => {
        let pathFile:string = "/wrongpath/fileToTest.txt";
        let dataText:string ="Welcomed to test :D ";
        
        const result = FileHelper.writeInFileSync(pathFile,dataText);
  
        expect(result).toEqual(false);
        });
  })

  describe('createFolder',() => {

    it('should return the pathFolder after he create it ', () => {
      let pathFolder:string = "./tests/Unit/Utils/resources/folderTest";
      
      const result = FileHelper.createFolder(pathFolder);

      expect(result).toEqual(pathFolder);
      });

    it('should return false after giving a wrong path folder  ', () => {
        let pathFolder:string = "/var/folderTest";
        
        const result = FileHelper.createFolder(pathFolder);
  
        expect(result).toEqual(false);
        });
  })

  describe('deleteFileSync', () => {
    it('should return true when the file deleted  ', () => {
        let pathFile:string = "./tests/Unit/Utils/resources/fileToTest.txt";
        
        const result = FileHelper.deleteFileSync(pathFile);

        expect(result).toBeTruthy();
    });

    it('should return false after giving a wrong path file  ', () => {
        let pathFile:string = "/var/wrongfile.txt";
       
        const result = FileHelper.deleteFileSync(pathFile);

        expect(result).toBeFalsy();
    });

  })

  
})