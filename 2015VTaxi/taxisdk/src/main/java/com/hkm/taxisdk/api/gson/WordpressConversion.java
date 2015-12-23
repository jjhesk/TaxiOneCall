package com.hkm.taxisdk.api.gson;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;

import org.jsoup.Jsoup;

import java.io.IOException;

/**
 * Created by hesk on 30/9/15.
 */
public class WordpressConversion extends TypeAdapter<String> {
    public WordpressConversion() {

    }

    public String read(JsonReader reader) throws IOException {
        String beforeDecoding = reader.nextString();
        //  Log.d("chk_conve_before", beforeDecoding);
        if (beforeDecoding.contains("<iframe") || beforeDecoding.contains("<IFRAME")) {
            return beforeDecoding;
        }
        final String converted = Jsoup.parse(beforeDecoding).text();
        //   Log.d("chk_conve", converted);
        return converted;
    }

    public void write(JsonWriter writer, String value) throws IOException {
        if (value == null) {
            writer.nullValue();
            return;
        }
        writer.value(value);
    }

}
