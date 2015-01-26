package com.hkm.taxicallandroid;

import android.content.Intent;
import android.os.Bundle;
import android.speech.RecognizerIntent;
import android.text.Html;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;
import android.app.Activity;

import com.afollestad.materialdialogs.MaterialDialog;
import com.asynhkm.productchecker.Model.CallTask;
import com.asynhkm.productchecker.Util.Tool;
import com.daimajia.swipe.SwipeLayout;
import com.hkm.taxicallandroid.CommonPack.Config;
import com.hkm.taxicallandroid.CommonPack.DialogTools;
import com.hkm.taxicallandroid.memory.Phone;
import com.hkm.taxicallandroid.memory.wordmem;
import com.hkm.taxicallandroid.schema.Call;
import com.hkm.taxicallandroid.schema.DataCallOrder;

import java.io.File;
import java.util.ArrayList;

/**
 * Created by hesk on 1/10/2015.
 */

public class MainControlTh extends Activity implements FolderSelectorDialog.FolderSelectCallback {
    private DataCallOrder order;
    private Button position_button, call_type, speak_button, additional_button;
    private static final int VOICE_RECOGNITION_REQUEST_CODE = 1001;
    private SwipeLayout f_destination, f_number, f_start;
    private Phone mphone;
    private speak_status mspeak_status;
    private DialogTools dialog_collection;
    private boolean calltriggered = false;
    private wordmem history_word;

    enum speak_status {
        SET_DESTINATION, SET_START_LOCATION
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.order);
        order = new DataCallOrder();
        history_word = new wordmem(this);
        dialog_collection = new DialogTools(this);
        mphone = new Phone(order, this);
        mphone.getPhoneNumber();
        call_type = (Button)
                findViewById(R.id.call_type);
        call_type.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showListTypeVech();
            }
        });
        additional_button = (Button)
                findViewById(R.id.additional_button);
        additional_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                dialog_collection.add_remarks();
            }
        });
        f_number = (SwipeLayout) findViewById(R.id.f_number);
        //f_number.setShowMode(SwipeLayout.ShowMode.LayDown);
        f_number.setDragEdge(SwipeLayout.DragEdge.Left);
        f_number.findViewById(R.id.change_number).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mphone.resetNumber(new Phone.callback() {
                    @Override
                    public void phonenumber(String num) {
                        updateNumber();
                    }
                });
            }
        });

        f_start = (SwipeLayout) findViewById(R.id.f_setstart);
        // f_destination.setShowMode(SwipeLayout.ShowMode.PullOut);
        //f_start.setDragEdge(SwipeLayout.DragEdge.Left);
        f_start.findViewById(R.id.speak_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mspeak_status = speak_status.SET_START_LOCATION;
                speak();
            }
        });
        f_start.findViewById(R.id.loc).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // getLocationCurrent();
                mspeak_status = speak_status.SET_START_LOCATION;
                dialog_collection.loc_history();
            }
        });


        f_destination = (SwipeLayout) findViewById(R.id.f_destination);
        // f_destination.setShowMode(SwipeLayout.ShowMode.PullOut);
        //  f_destination.setDragEdge(SwipeLayout.DragEdge.Left);
        f_destination
                .findViewById(R.id.speak_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mspeak_status = speak_status.SET_DESTINATION;
                speak();
            }
        });
        f_destination.findViewById(R.id.pin).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mspeak_status = speak_status.SET_DESTINATION;
                dialog_collection.pin_azure();
            }
        });
        f_destination.findViewById(R.id.history_destin).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mspeak_status = speak_status.SET_DESTINATION;
                dialog_collection.loc_history();
            }
        });


        display_start_loc = (TextView) f_start.findViewById(R.id.display_start_location);
        display_destination = (TextView) f_destination.findViewById(R.id.display_location_destination);
        display_number = (TextView) f_number.findViewById(R.id.display_number);

        ((Button) findViewById(R.id.order_send)).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                triggerCall();
            }
        });

        mphone.setPhoneNumberDisplay(display_number);

    }


    private TextView display_number, display_destination, display_start_loc;

    public void speak() {
        String myLanguage = "zh_HK";
        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        // Specify the calling package to identify your application
        intent.putExtra(RecognizerIntent.EXTRA_CALLING_PACKAGE, getClass().getPackage().getName());

        // Display an hint to the user about what he should say.
        // intent.putExtra(RecognizerIntent.EXTRA_PROMPT, metTextHint.getText().toString());

        // Given an hint to the recognizer about what the user is going to say
        // There are two form of language model available
        //1.LANGUAGE_MODEL_WEB_SEARCH : For short phrases
        //2.LANGUAGE_MODEL_FREE_FORM  : If not sure about the words or phrases and its domain.
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_WEB_SEARCH);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, myLanguage);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_PREFERENCE, myLanguage);
        intent.putExtra(RecognizerIntent.EXTRA_ONLY_RETURN_LANGUAGE_PREFERENCE, myLanguage);
        // If number of Matches is not selected then return show toast message
        /* if (msTextMatches.getSelectedItemPosition() == AdapterView.INVALID_POSITION) {
            showToastMessage("Please select No. of Matches from spinner");
            return;
        }*/

        //    int noOfMatches = Integer.parseInt(msTextMatches.getSelectedItem().toString());
        // Specify how many results you want to receive. The results will be
        // sorted where the first result is the one with higher confidence.
        //  intent.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, noOfMatches);
        //Start the Voice recognizer activity for the result.
        startActivityForResult(intent, VOICE_RECOGNITION_REQUEST_CODE);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == VOICE_RECOGNITION_REQUEST_CODE)
            //If Voice recognition is successful then it returns RESULT_OK
            if (resultCode == RESULT_OK) {
                ArrayList<String> textMatchList = data
                        .getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
                if (!textMatchList.isEmpty()) {
                    dialog_collection.showSuggestion(textMatchList.toArray(new String[textMatchList.size()]));
                }
                //Result code for various error.
            } else if (resultCode == RecognizerIntent.RESULT_AUDIO_ERROR) {
                showToastMessage("Audio Error");
            } else if (resultCode == RecognizerIntent.RESULT_CLIENT_ERROR) {
                showToastMessage("Client Error");
            } else if (resultCode == RecognizerIntent.RESULT_NETWORK_ERROR) {
                showToastMessage("Network Error");
            } else if (resultCode == RecognizerIntent.RESULT_NO_MATCH) {
                showToastMessage("No Match");
            } else if (resultCode == RecognizerIntent.RESULT_SERVER_ERROR) {
                showToastMessage("Server Error");
            }
        super.onActivityResult(requestCode, resultCode, data);
    }

    private void updateNumber() {
        display_number.setText(order.getnumber());
    }

    public void updateRemark(String remark) {
        order.setremark(remark);
    }

    public void updateLocation(String destination) {

        if (mspeak_status == speak_status.SET_DESTINATION) {
            display_destination.setText(destination);
            order.setDestination(destination);
            f_destination.close(true);
        }
        if (mspeak_status == speak_status.SET_START_LOCATION) {
            display_start_loc.setText(destination);
            order.setStartLocation(destination);
            f_start.close(true);
        }
        history_word.addWord(destination);
    }


    private void showToastMessage(String e) {
        Tool.trace(this, e);
    }

    private void getLocationCurrent() {
        new MaterialDialog.Builder(this)
                .content(R.string.getLocationOnce)
                .positiveText(R.string.agree)
                .negativeText(R.string.disagree)
                .callback(new MaterialDialog.ButtonCallback() {
                    @Override
                    public void onPositive(MaterialDialog dialog) {
                        Tool.trace(getApplicationContext(), "wait...");
                        LocationReader lr = new LocationReader(order
                                , getApplicationContext(),
                                new LocationReader.callback() {
                                    @Override
                                    public void completeRequest(DataCallOrder m) {
                                        Tool.trace(getApplicationContext(),
                                                "complete request"
                                                        + m.getCity()
                                        );

                                        position_button.setText(m.getCity());
                                    }
                                });
                        lr.enableGPS();
                    }
                })
                .show();
    }

    private int auto_type = 0;

    private void triggerCall() {
        try {
            /*   runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    try {
                        order.checkComplete();
                    } catch (Exception e) {
                        dialog_collection.showSimpleMessage(e.getMessage());
                    }
                }
            });*/
            order.checkComplete();
            if (!calltriggered) calltriggered = true;
            else throw new Exception("triggered");

            Call mCall = new Call(getApplicationContext(), new CallTask.callback() {
                @Override
                public void onSuccess(final String data) {
                    dialog_collection.progress_bar_dismiss();
                    // if (calltriggered)
                    // dialog_collection.showSimpleMessage(data);
                    calltriggered = false;
                    show_waiting(data);
                }

                @Override
                public void onFailure(final String message) {
                    dialog_collection.progress_bar_dismiss();
                    // if (calltriggered)
                    dialog_collection.showSimpleMessage(message);
                    calltriggered = false;
                }

                @Override
                public void beforeStart(final CallTask task) {
                    dialog_collection.progress_bar_start(R.string.making_calls);

                }
            });

            mCall
                    .setURL(Config.domain + Config.control.newcall)
                    .setBody(order.consolidate())
                    .execute();

        } catch (NullPointerException e) {
            dialog_collection.showSimpleMessage(e.getMessage());
        } catch (Exception e) {
            //  dialog_collection.showSimpleMessage(e.getMessage());
        }
    }

    private void show_waiting(final String raw) {
        final Intent intent = new Intent(this, WaitingForRide.class);
        //    EditText editText = (EditText) findViewById(R.id.edit_message);
        //    String message = editText.getText().toString();
        final Bundle b = new Bundle();
        b.putString("json_order", raw);
        intent.putExtras(b);
        startActivity(intent);
        //check
    }

    private void showListTypeVech() {

        new MaterialDialog.Builder(this)
                .title(R.string.call_type_title)
                .items(R.array.AutoType)
                .itemsCallbackSingleChoice(auto_type, new MaterialDialog.ListCallback() {
                    @Override
                    public void onSelection(MaterialDialog dialog, View view, int which, CharSequence text) {
                        //Tool.trace(getApplicationContext(), which + " : " + text);
                        call_type.setText(text);
                        auto_type = which;
                        order.setType(text.toString());
                    }
                })
                .positiveText(R.string.choose)
                .show();
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main, menu);
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.about) {
            new MaterialDialog.Builder(this)
                    .title(R.string.about)
                    .positiveText(R.string.dismiss)
                    .content(Html.fromHtml(getString(R.string.about_body)))
                    .contentLineSpacing(1.6f)
                    .build()
                    .show();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onFolderSelection(File folder) {
        Toast.makeText(this, folder.getAbsolutePath(), Toast.LENGTH_SHORT).show();
    }
}
