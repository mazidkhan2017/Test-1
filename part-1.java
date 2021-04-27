/*
    1. First we will split one large file into chunks(In small size of files)
*/


import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

public class FileSpliter {

	public static void main(String[] args) {
		 File myObj = new File("largefile.txt");
		 try {
			splitFile(myObj, 10);
			System.out.println("File split task done");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	public static List<File> splitFile(File file, int sizeOfFileInMB) throws IOException {
	    int counter = 1;
	    List<File> files = new ArrayList<File>();
	    int sizeOfChunk = 1024 * 1024 * sizeOfFileInMB;
	    String eof = System.lineSeparator();
	    try (BufferedReader br = new BufferedReader(new FileReader(file))) {
	        String name = file.getName();
	        String line = br.readLine();
	        while (line != null) {
	            File newFile = new File(file.getParent(), name + ""
	                    + String.format("%03d", counter++)+".txt");
	            try (OutputStream out = new BufferedOutputStream(new FileOutputStream(newFile))) {
	                int fileSize = 0;
	                while (line != null) {
	                    byte[] bytes = (line + eof).getBytes(Charset.defaultCharset());
	                    if (fileSize + bytes.length > sizeOfChunk)
	                        break;
	                    out.write(bytes);
	                    fileSize += bytes.length;
	                    line = br.readLine();
	                }
	            }
	            files.add(newFile);
	        }
	    }
	    return files;
	}
}
